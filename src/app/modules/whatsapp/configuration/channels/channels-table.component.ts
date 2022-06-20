import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import icSearch from "@iconify/icons-ic/twotone-search";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icSettings from "@iconify/icons-ic/twotone-settings";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
    selector: "frontend-whatsapp-channels-table",
    templateUrl: "./channels-table.component.html",
    styleUrls: ["./channels-table.component.scss"],
    animations: [fadeInUp400ms, stagger40ms],
})
export class ChannelsTableComponent implements OnInit {
    //Icons
    icSearch = icSearch;
    icMoreHoriz = icMoreHoriz;
    icSettings = icSettings;

    //Inputs
    @Input()
    columns: TableColumn<any>[] = [
        { label: "Nombre", property: "phone_number", type: "text", visible: true },
        { label: "Acciones", property: "actions", type: "button", visible: true },
    ];

    //ViewChild
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    //Paginator
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    searchCtrl = new FormControl();
    dataSource: MatTableDataSource<any> | null;

    constructor() {}

    ngOnInit(): void {}

    get visibleColumns() {
        return this.columns.filter((column) => column.visible).map((column) => column.property);
    }

    trackByProperty<T>(index: number, column: TableColumn<T>) {
        return column.property;
    }

    OnPageChange(event: PageEvent) {
        //this.getData(event.pageIndex + 1, event.pageSize);
    }

}

