import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { ChannelService } from "../../../services/channel.service";
import { Subscription } from "rxjs";
import { ChannelConfiguration, Step } from "../../../interfaces/channel-configuration.interface";
import { ActionMessageComponent } from "./action-message/action-message.component";
import { Item } from "./item.interface";
import { ActionDataRequestComponent } from "./action-data-request/action-data-request.component";
import { ActionRedirectionComponent } from "./action-redirection/action-redirection.component";
import { ActionOptionsComponent } from "./action-options/action-options.component";
import { ActionGuideComponent } from "./action-guide/action-guide.component";

export interface ActionConfig {
    config: ChannelConfiguration,
    action: string
}

@Component({
    selector: "frontend-whatsapp-channel-configuration",
    templateUrl: "./channel-configuration.component.html",
    styleUrls: ["./channel-configuration.component.scss"],
})
export class ChannelConfigurationComponent implements OnInit, OnDestroy {
    items: Item[] = [
        { action: "message", value: "Mensaje" },
        { action: "quiz", value: "Petición de Datos" },
        //{ action: "menu", value: "Guía de Respuestas y Transferencias" },
        { action: "redirect", value: "Redirección" },
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
    redirectId: number;

    isDisabled: boolean;

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
        this.redirectId = 0;
    }

    ngOnInit(): void {
        this.isDisabled = false;
        this.getData();
    }

    getData() {
        this.subscription = new Subscription();

        this.subscription = this.channelService
            .getChannelConfig(this.defaults.phone_number)
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
                    this.steps = response.data.steps;
                    if (response.data.messages.length > 0) {
                        this.messageId =
                            Math.max(
                                ...response.data.steps
                                    .filter((n) => n.action.split(".")[0] === "message")
                                    .map((x) => x.action.split(".")[1])
                            ) + 1;
                    }
                    if (response.data.quizes.length > 0) {
                        this.dataRequestId =
                            Math.max(
                                ...response.data.steps
                                    .filter((n) => n.action.split(".")[0] === "quiz")
                                    .map((x) => x.action.split(".")[1])
                            ) + 1;
                    }
                    if (response.data.menus.length > 0) {
                        this.optionsMenuId =
                            Math.max(
                                ...response.data.steps
                                    .filter((n) => n.action.split(".")[0] === "menu")
                                    .map((x) => x.action.split(".")[1])
                            ) + 1;
                    }
                    if (response.data.redirects.length > 0) {
                        this.optionsMenuId =
                            Math.max(
                                ...response.data.steps
                                    .filter((n) => n.action.split(".")[0] === "redirect")
                                    .map((x) => x.action.split(".")[1])
                            ) + 1;
                    }
                } else {
                    this.config = {
                        id: null,
                        channel_id: null,
                        channel_number: this.defaults.phone_number,
                        menus: [],
                        messages: [],
                        quizes: [],
                        steps: [],
                        redirects: []
                    };
                    this.status = "create";
                }
            });
    }

    drop(event: CdkDragDrop<Item[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            let lastAction = event.previousContainer.data[event.previousIndex].action;
            if (lastAction.includes('redirect') || lastAction.includes('menu')) {
                this.isDisabled = true;
                copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, this.basket.length);
                this.updateConfig(this.basket.length - 1);
            }else {
                console.log(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
                copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
                this.updateConfig(event.currentIndex);
            }
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
            case "redirect":
                actionStep += `.${this.redirectId}`;
                this.redirectId++;
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

        this.basket[step] = {
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
                //value = ActionOptionsComponent;
                value = ActionGuideComponent;
                break;
            case "redirect":
                value = ActionRedirectionComponent;
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
                    redirectId: this.redirectId
                },
            })
            .afterClosed()
            .subscribe((config: ActionConfig) => {
                if (config[1] === 'noaction') {
                    this.basket.splice(this.basket.length - 1, 1);
                    if (actionAndId[0]==='redirect') {
                        this.isDisabled = false;
                    }
                    if (actionAndId[0]==='menu') {
                        this.isDisabled = false;
                    }
                } else {
                    if (actionAndId[1]) {
                        this.config = { ...config[0] };
                    } else {
                        this.config = { ...config[0] };
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
        let action = this.steps[i].action.split(".");

        switch (action[0]) {
            case "message":
                this.config.messages.splice(i, 1);
                break;
            case "quiz":
                this.config.quizes.splice(i, 1);
                break;
            case "menu":
                this.config.redirects.splice(-1, 1);
                this.isDisabled = false;
                break;
            case "redirect":
                this.config.redirects.splice(-1, 1);
                this.isDisabled = false;
                break;

            default:
                break;
        }

        console.log(this.config.messages)

        this.basket.splice(i, 1);

        console.log(this.basket)

        this.steps.splice(i, 1);

        console.log(this.steps)
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
