import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import icSearch from "@iconify/icons-ic/twotone-search";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icSettings from "@iconify/icons-ic/twotone-settings";
import icEye from "@iconify/icons-ic/twotone-remove-red-eye";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { ChannelService } from "../../services/channel.service";
import { Channel } from "../../models/channel.model";
import { ChannelConfigurationComponent } from "./channel-configuration/channel-configuration.component";
import { MatDialog } from "@angular/material/dialog";
import { ChannelViewComponent } from "./channel-view/channel-view.component";

@Component({
    selector: "frontend-whatsapp-channels-table",
    templateUrl: "./channels-table.component.html",
    styleUrls: ["./channels-table.component.scss"],
    animations: [fadeInUp400ms, stagger40ms],
})
export class ChannelsTableComponent implements OnInit, OnDestroy {
    //Icons
    icSearch = icSearch;
    icMoreHoriz = icMoreHoriz;
    icSettings = icSettings;
    icEye = icEye;

    visualizationStatus: boolean;

    //Inputs
    @Input()
    columns: TableColumn<any>[] = [
        { label: "Número Telefónico", property: "name", type: "text", visible: true },
        { label: "Acciones", property: "actions", type: "button", visible: true },
    ];

    //ViewChild
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    //Paginator
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    searchCtrl = new FormControl();
    dataSource: MatTableDataSource<Channel> | null;
    subscription: Subscription;

    constructor(private channelService: ChannelService, private dialog: MatDialog) {}

    ngOnInit(): void {

        this.getData(1, this.pageSize);

    }

    getData(page?: number, pageSize?: number){
        this.subscription = new Subscription();
        this.subscription = this.channelService.getChannels(page, pageSize).subscribe((result: any) => {
            this.dataSource = result.data.channels;
        });
    }

    configureChannel(channel: Channel) {
        this.dialog
            .open(ChannelConfigurationComponent, {
                data: channel,
            })
            .afterClosed()
            .subscribe((updatedChannel) => {

                // if (updatedChannel) {

                //     this.subscription = new Subscription();
                //     this.subscription = this.groupService.updateGroup(updatedGroup).subscribe(
                //         () => {
                //             this.snackbar.open("Grupo actualizado exitosamente.", "Completado", {
                //                 duration: 3000,
                //                 horizontalPosition: "center",
                //                 panelClass: ["green-snackbar"],
                //             });
                //             this.getData(1, this.pageSize);
                //         },
                //         ({ error }) => {
                //             this.snackbar.open(error.message, "X", {
                //                 duration: 3000,
                //                 horizontalPosition: "center",
                //                 panelClass: ["red-snackbar"],
                //             });
                //         }
                //     );
                // }
            });
    }

    viewChannel(channel: Channel) {
        this.dialog
            .open(ChannelViewComponent, {
                data: channel,
            })
            .afterClosed()
            .subscribe(() => {

            });
    }

    validateVisualizationStatus(channel: Channel){
        debugger
        this.subscription = this.channelService.getPrettyConfiguration(channel.phone_number).subscribe(
            (response: any)=>{
                if (response && response.data.length>0) {
                    this.visualizationStatus = true;
                    console.log(response)
                }else{
                    this.visualizationStatus = false;
                }
            }
        );
    }

    get visibleColumns() {
        return this.columns.filter((column) => column.visible).map((column) => column.property);
    }

    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }

    OnPageChange(event: PageEvent) {
        //this.getData(event.pageIndex + 1, event.pageSize);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

