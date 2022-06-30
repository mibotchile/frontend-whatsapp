import { Component, Inject, OnInit } from '@angular/core';
import icClose from "@iconify/icons-ic/twotone-close";
import icPeople from "@iconify/icons-ic/people";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/modules/whatsapp/interfaces/channel-configuration.interface';

@Component({
  selector: 'frontend-whatsapp-action-attention',
  templateUrl: './action-attention.component.html',
  styleUrls: ['./action-attention.component.scss']
})
export class ActionAttentionComponent implements OnInit {

    icClose = icClose;
    icPeople = icPeople;

    form: FormGroup;
    mode: "create" | "update" = "create";

    message : Message;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionAttentionComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {

         this.message = {
            id: 0,
            title: '',
            message: ''
         };

        // if (messages.length >= 1) {
        //     this.mode = "update";
        // }
        // else {
        //     messages = {} as Message;
        // }

        this.mode = "create";

        this.form = this.fb.group({
            id: this.message.id,
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

        this.defaults.messages.push(message);
        this.dialogRef.close(this.defaults);
    }

    updateMessage() {
        const message = this.form.value;
        message.id = this.defaults.id;

        this.dialogRef.close(message);
    }

    isCreateMode() {
        return this.mode === "create";
    }

    isUpdateMode() {
        return this.mode === "update";
    }
}
