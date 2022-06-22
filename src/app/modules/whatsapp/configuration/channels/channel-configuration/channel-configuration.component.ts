import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { ChannelService } from "../../../services/channel.service";
import { Subscription } from "rxjs";
import { ChannelConfiguration, Message } from "../../../interfaces/channel-configuration.interface";
import { ActionMessageComponent } from "./action-message/action-message.component";
import { Channel } from "../../../models/channel.model";
import { Item } from "./item.interface";
import { ActionDataRequestComponent } from "./action-data-request/action-data-request.component";

@Component({
    selector: "frontend-whatsapp-channel-configuration",
    templateUrl: "./channel-configuration.component.html",
    styleUrls: ["./channel-configuration.component.scss"],
})
export class ChannelConfigurationComponent implements OnInit, OnDestroy {
    items: Item[] = [
        { action: "message", value: "Mensaje" },
        { action: "dataRequest", value: "Petición de Datos" },
        { action: "optionsMenu", value: "Menu de Opciones" },
        { action: "attention", value: "Valoración de la Atención" },
    ];

    basket: Item[] = [];

    subscription: Subscription;

    config: ChannelConfiguration;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ChannelConfigurationComponent>,
        private channelService: ChannelService,
        private dialog: MatDialog
    ) {}


    ngOnInit(): void {
        this.config = {
            id: null,
            channel_id: null,
            channel_number: this.defaults.phoneNumber,
            menus: [],
            messages: [],
            quizes: [],
            questions: [],
            steps: [],
        };
        this.subscription = new Subscription();
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.updateConfig(this.basket[this.basket.length-1].action,this.config);
        }
    }

    updateConfig(action: string, data: any){
        let value: any;

        switch (action) {
            case 'message':
                value = ActionMessageComponent;
                break;
            case 'dataRequest':
                value = ActionDataRequestComponent;
                break;
            default:
                break;
        }

        this.dialog
            .open(value, {
                data: data,
            })
            .afterClosed()
            .subscribe((config: ChannelConfiguration) => {
                if (!config) {
                    this.basket.splice(this.basket.length-1,1);
                }else{
                    this.config = {...config};
                }
            });
    }

    onCreate(){
        this.subscription = new Subscription();
        this.subscription = this.channelService.setChannelConfig(this.config).subscribe(
            ()=>{
                this.dialogRef.close();
            }
        );
    }


    deleteConfig(i: number) {
        this.basket.splice(i, 1);
    }


    onNoClick(): void {
        this.dialogRef.close();
      }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
