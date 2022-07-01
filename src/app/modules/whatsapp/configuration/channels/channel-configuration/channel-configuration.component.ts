import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { ChannelService } from "../../../services/channel.service";
import { Subscription } from "rxjs";
import { ChannelConfiguration, Message, Step } from "../../../interfaces/channel-configuration.interface";
import { ActionMessageComponent } from "./action-message/action-message.component";
import { Channel } from "../../../models/channel.model";
import { Item } from "./item.interface";
import { ActionDataRequestComponent } from "./action-data-request/action-data-request.component";
import { ActionOptionsMenuComponent } from "./action-options-menu/action-options-menu.component";
import { ActionAttentionComponent } from "./action-attention/action-attention.component";

@Component({
    selector: "frontend-whatsapp-channel-configuration",
    templateUrl: "./channel-configuration.component.html",
    styleUrls: ["./channel-configuration.component.scss"],
})
export class ChannelConfigurationComponent implements OnInit, OnDestroy {
    items: Item[] = [
        { action: "message", value: "Mensaje" },
        { action: "quiz", value: "Petición de Datos" },
        { action: "menu", value: "Menu de Opciones" },
        // { action: "attention", value: "Valoración de la Atención" },
    ];

    basket: Item[] = [];

    subscription: Subscription;

    config: ChannelConfiguration;

    steps: Step[];

    status: string;

    messageId: number;
    dataRequestId: number;
    optionsMenuId: number;
    attentionId: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ChannelConfigurationComponent>,
        private channelService: ChannelService,
        private dialog: MatDialog
    ) {
        this.steps = [];
        this.messageId = 0;
        this.dataRequestId = 0;
        this.optionsMenuId = 0;
        this.attentionId = 0;
    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.subscription = new Subscription();

        this.subscription = this.channelService
            .getChannelConfig(this.defaults.phoneNumber)
            .subscribe((response: any) => {
                if (response.data) {
                    this.config = response.data;
                    this.status = "update";
                    this.steps = response.data.steps;
                    response.data.steps.forEach((e) => {
                        this.basket.push({
                            action: e.action,
                            value: this.items.filter((n) => n.action === e.action.split(".")[0])[0].value,
                        });
                    });
                } else {
                    this.config = {
                        id: null,
                        channel_id: null,
                        channel_number: this.defaults.phoneNumber,
                        menus: [],
                        messages: [],
                        quizes: [],
                        steps: [],
                    };
                    this.status = "create";
                }
            });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            this.updateConfig(event.currentIndex);
        }
    }

    createStepsObject(step: number, action: string = "") {
        let actionStep: string = action;

        switch (actionStep) {
            case "message":
                actionStep += `.${this.messageId}`;
                this.messageId++;
                break;
            case "quiz":
                actionStep += `.${this.dataRequestId}`;
                this.dataRequestId++;
                break;
            case "menu":
                actionStep += `.${this.optionsMenuId}`;
                this.optionsMenuId++;
                break;
            case "attention":
                actionStep += `.${this.attentionId}`;
                this.attentionId++;
                break;
            default:
                break;
        }

        this.steps.splice(step, 0, {
            step: 0,
            action: actionStep,
            status: 1,
        });
        this.steps.forEach((e, i) => {
            e.step = i + 1;
        });

        this.basket[this.basket.length - 1] = {
            action: actionStep,
            value: this.items.filter((n) => n.action === actionStep.split(".")[0])[0].value,
        };
    }

    updateConfig(index: number) {
        let value: any;

        let action = this.basket[index].action;

        let actionAndId = action.split(".");
        switch (actionAndId[0]) {
            case "message":
                value = ActionMessageComponent;
                break;
            case "quiz":
                value = ActionDataRequestComponent;
                break;
            case "menu":
                value = ActionOptionsMenuComponent;
                break;
            case "attention":
                value = ActionAttentionComponent;
                break;
            default:
                break;
        }

        this.dialog
            .open(value, {
                data: {
                    configuration: this.config,
                    id: actionAndId[1],
                    messageId: this.messageId,
                    dataRequestId: this.dataRequestId,
                    optionsMenuId: this.optionsMenuId,
                    attentionId: this.attentionId,
                },
            })
            .afterClosed()
            .subscribe((config: ChannelConfiguration) => {
                if (!config || config.messages.length === 0) {
                    this.basket.splice(this.basket.length - 1, 1);
                } else {
                    if (actionAndId[1]) {
                        this.config = { ...config };
                    } else {
                        this.config = { ...config };
                        this.createStepsObject(index, action);
                    }
                }
            });
    }

    onCreate() {
        this.config.steps = this.steps;

        this.subscription = new Subscription();
        this.subscription = this.channelService.setChannelConfig(this.config).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onUpdate() {
        this.config.steps = this.steps;

        this.subscription = new Subscription();
        this.subscription = this.channelService.updateChannelConfigs(this.config).subscribe(() => {
            this.dialogRef.close();
        });
    }

    deleteConfig(i: number) {
        this.basket.splice(i, 1);
        this.steps.splice(i, 1);
        this.steps.forEach((e, i) => {
            e.step = i + 1;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
