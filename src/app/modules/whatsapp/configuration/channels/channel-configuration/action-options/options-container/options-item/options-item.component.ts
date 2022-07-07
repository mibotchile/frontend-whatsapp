import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Menu } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";
import { ActionRedirectionComponent } from "../../../action-redirection/action-redirection.component";

export interface MenuOption {
    id: number;
    title: string;
    menu?: MenuOption[];
}

@Component({
    selector: "frontend-whatsapp-options-item",
    templateUrl: "./options-item.component.html",
    styleUrls: ["./options-item.component.scss"],
})
export class OptionsItemComponent implements OnInit {
    @Input()
    menuList: Menu[];

    menu: Menu;
    menuOutput: Menu;
    newMenu: MenuOption[];

    status: boolean;

    toggle = {};

    constructor(private dialog: MatDialog) {
        this.status = false;
    }

    ngOnInit(): void {
        this.newMenu = [];

        this.menu = {
            id: 0,
            title: "root",
            options: [
                {
                    id: 0,
                    value: "Menu 1",
                    action: "menu.0",
                },
                {
                    id: 1,
                    value: "Menu 2",
                    action: "menu.1",
                },
                {
                    id: 2,
                    value: "Redirect 1",
                    action: "redirect.1",
                },
            ],
        };
        this.menuOutput = { ...this.menu };
        this.convertToMenuOption(this.menuList);
    }

    convertToMenuOption(menuList: Menu[]) {
        let menuArray = [...this.menuList];

        let menuIds = menuArray[0].options.filter((n) => n.action.split(".")[0] === "menu").map((x) => x.action.split(".")[1]);
        let newMenuArray = menuArray.filter(n => menuIds.includes(n.id.toString()));
        console.log(newMenuArray)
    }

    addNewElement(element: string) {
        if (element.length > 0) {
            this.menuOutput.options.push({
                id: this.menuOutput.options.length,
                value: element,
                action: "",
            });
        }
    }
}
