import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icMessage from "@iconify/icons-ic/message";
import { ChannelConfiguration, Message } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";


@Component({
    selector: "frontend-whatsapp-action-message",
    templateUrl: "./action-message.component.html",
    styleUrls: ["./action-message.component.scss"],
})
export class ActionMessageComponent implements OnInit, OnDestroy {
    icClose = icClose;
    icMessage = icMessage;

    form: FormGroup;
    mode: "create" | "update" = "create";

    message : Message;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionMessageComponent>,
        private fb: FormBuilder
    ) {}


    ngOnInit(): void {

        if (this.defaults.id) {
            this.mode = 'update';
            this.message = {
                id: this.defaults.id,
                title: this.defaults.configuration.messages.filter(n=>n.id == this.defaults.id)[0].title,
                message: this.defaults.configuration.messages.filter(n=>n.id == this.defaults.id)[0].message
             };
        } else {
            this.message = {
                id: this.defaults.messageId,
                title: '',
                message: ''
             };
        }

        this.form = this.fb.group({
            id: this.message.id,
            title: this.message.title,
            message: this.message.message,
        });
    }

    save() {
        if (this.mode === "create") {
            this.createMessage();
        } else if (this.mode === "update") {
            this.updateMessage();
        }
    }

    createMessage() {
        const message = this.form.value;

        this.defaults.configuration.messages.push(message);
        this.dialogRef.close(this.defaults.configuration);
    }

    updateMessage() {
        const message = this.form.value;
        //message.id = this.defaults.id;

        this.dialogRef.close(this.defaults.configuration);
    }

    isCreateMode() {
        return this.mode === "create";
    }

    isUpdateMode() {
        return this.mode === "update";
    }

    ngOnDestroy(): void {
        this.dialogRef.close(this.defaults.configuration);
    }
}
