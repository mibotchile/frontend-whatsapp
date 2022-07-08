import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icMessage from "@iconify/icons-ic/message";

@Component({
    selector: "frontend-whatsapp-action-options",
    templateUrl: "./action-options.component.html",
    styleUrls: ["./action-options.component.scss"],
})
export class ActionOptionsComponent implements OnInit {

    icClose = icClose;
    icMessage = icMessage;

    mode: "create" | "update" = "create";
    action: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionOptionsComponent>
    ) {}

    ngOnInit(): void {
        this.action = 'noaction';
    }

    save() {
        if (this.mode === "create") {
            this.createMenu();
        } else if (this.mode === "update") {
            this.updateMenu();
        }
    }

    createMenu() {
        // this.defaults.configuration.messages.push(message);
        // this.dialogRef.close([this.defaults.configuration,this.action]);
    }

    updateMenu() {
        // this.action = 'update'
        // this.defaults.configuration.messages.splice(this.defaults.id,0,message);
        // this.dialogRef.close([this.defaults.configuration,this.action]);
    }

    isCreateMode() {
        return this.mode === "create";
    }

    isUpdateMode() {
        return this.mode === "update";
    }

    ngOnDestroy(): void {
        this.dialogRef.close([this.defaults.configuration,this.action]);
    }
}

