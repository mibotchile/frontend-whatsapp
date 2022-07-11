import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ChannelConfiguration, Step } from "../../../interfaces/channel-configuration.interface";
import { ChannelService } from "../../../services/channel.service";
import { Item } from "../channel-configuration/item.interface";


@Component({
    selector: "frontend-whatsapp-channel-view",
    templateUrl: "./channel-view.component.html",
    styleUrls: ["./channel-view.component.scss"],
})
export class ChannelViewComponent implements OnInit, OnDestroy {

    items: Item[] = [
        { action: "message", value: "Mensaje" },
        { action: "quiz", value: "Petición de Datos" },
        { action: "menu", value: "Guía de Respuestas y Transferencias" },
        { action: "redirect", value: "Redirección" },
        // { action: "attention", value: "Valoración de la Atención" },
    ];

    subscription: Subscription;
    configuration: ChannelConfiguration;
    steps: Step[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ChannelViewComponent>,
        private dialog: MatDialog,
        private channelService: ChannelService
    ) {}

    ngOnInit(): void {
        this.subscription = new Subscription();

        this.subscription = this.channelService
            .getChannelConfig(this.defaults.phoneNumber)
            .subscribe((response: any) => {
                this.configuration = response.data;
                this.steps = response.data.steps;
            });

    }



    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
