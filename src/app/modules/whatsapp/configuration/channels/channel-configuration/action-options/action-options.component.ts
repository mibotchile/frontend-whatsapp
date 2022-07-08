import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icMessage from "@iconify/icons-ic/message";
import { Menu, Redirect } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

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

    menus: Menu[];
    redirects: Redirect[];

    menuId: number;
    redirectId: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionOptionsComponent>
    ) {
        this.menuId = 0;
        this.redirectId = 0;
        this.menus = [{
            id: this.defaults.optionsMenuId,
            title: "Menu Principal",
            options: [

            ],
        }];

        this.redirects = [];
    }

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
        this.action = 'create';
        this.menus.forEach(e=>{
            // e.options.forEach(e1=>{
            //     if (e1.action === 'menu') {
            //         e1.id = this.menuId;
            //         e1.action = `menu.${this.menuId+1}`;
            //         this.menuId++;
            //     }else{
            //         e1.id = this.redirectId;
            //         e1.action = `redirect.${this.redirectId+1}`;
            //         this.redirectId++;
            //     }
            // });
            this.defaults.configuration.menus.push(e);
        });

        this.redirects.forEach(e=>{
            this.defaults.configuration.redirects.push(e);
        });

        this.dialogRef.close([this.defaults.configuration,this.action]);
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

    getMenuTitle(title: string){
        this.menus.push({
            id: this.menus.length,
            title: title,
            options: []
        });

        console.log(this.menus);
    }

    getRedirectObject(redirect: Redirect){
        console.log(redirect)
        this.redirects.push({
            id: this.defaults.redirectId++,
            to: redirect.to
        });
    }

    ngOnDestroy(): void {
        this.dialogRef.close([this.defaults.configuration,this.action]);
    }
}

