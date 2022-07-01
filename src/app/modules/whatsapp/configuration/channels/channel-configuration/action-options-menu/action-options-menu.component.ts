import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icPeople from "@iconify/icons-ic/people";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Menu } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

@Component({
    selector: "frontend-whatsapp-action-options-menu",
    templateUrl: "./action-options-menu.component.html",
    styleUrls: ["./action-options-menu.component.scss"],
})
export class ActionOptionsMenuComponent implements OnInit {
    icClose = icClose;
    icPeople = icPeople;

    status: boolean;

    menus: Menu[];
    menu: Menu;

    form: FormGroup;
    mode: "create" | "update" = "create";

    elements: Menu[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionOptionsMenuComponent>,
        private fb: FormBuilder
    ) {
        this.elements = [];
    }

    ngOnInit(): void {
        this.menus = [];

        this.menu = {
            id: 0,
            title: "",
            options: [],
        };

        this.mode = "create";

        this.form = this.fb.group({
            id: this.menu.id,
            message: this.menu.title,
        });
    }

    addNewData(event: Event){
        console.log(event);
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
