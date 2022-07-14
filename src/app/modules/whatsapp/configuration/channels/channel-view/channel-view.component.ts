import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ChannelConfiguration, Step } from "../../../interfaces/channel-configuration.interface";
import { ChannelService } from "../../../services/channel.service";
import { Item } from "../channel-configuration/item.interface";
import icClose from "@iconify/icons-ic/twotone-close";
import { PrettyConfig } from "./pretty-config.interface";
import { Channel } from "../../../models/channel.model";
import { ChannelConfigurationComponent } from "../channel-configuration/channel-configuration.component";

@Component({
    selector: "frontend-whatsapp-channel-view",
    templateUrl: "./channel-view.component.html",
    styleUrls: ["./channel-view.component.scss"],
})
export class ChannelViewComponent implements OnInit, OnDestroy {

    icClose = icClose;

    items: Item[] = [
        { action: "message", value: "Mensaje" },
        { action: "quiz", value: "Petición de Datos" },
        { action: "menu", value: "Guía de Respuestas y Transferencias" },
        { action: "redirect", value: "Redirección" },
        // { action: "attention", value: "Valoración de la Atención" },
    ];

    subscription: Subscription;
    prettyConfiguration: PrettyConfig;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ChannelViewComponent>,
        private dialog: MatDialog,
        private channelService: ChannelService
    ) {}

    ngOnInit(): void {
        this.subscription = new Subscription();

        this.subscription = this.channelService
            .getPrettyConfiguration(this.defaults.phone_number)
            .subscribe((response: any) => {
                this.prettyConfiguration = response.data;
            });

    }

    openUpdateRedirection(){
        this.dialog
            .open(ChannelConfigurationComponent, {
                data: this.defaults,
            })
            .afterClosed()
            .subscribe(() => {
                this.dialogRef.close();
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
