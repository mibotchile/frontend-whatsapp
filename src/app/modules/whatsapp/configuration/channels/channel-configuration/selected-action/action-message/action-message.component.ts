import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icPeople from "@iconify/icons-ic/people";
import { Message } from "./message.interface";

@Component({
    selector: "frontend-whatsapp-action-message",
    templateUrl: "./action-message.component.html",
    styleUrls: ["./action-message.component.scss"],
})
export class ActionMessageComponent implements OnInit {
    icClose = icClose;
    icPeople = icPeople;

    form: FormGroup;
    mode: "create" | "update" = "create";

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionMessageComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        if (this.defaults) {
            this.mode = "update";
        } else {
            this.defaults = {} as Message;
        }

        this.form = this.fb.group({
            id: this.defaults.id,
            message: this.defaults.message,
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
        this.dialogRef.close(message);
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
