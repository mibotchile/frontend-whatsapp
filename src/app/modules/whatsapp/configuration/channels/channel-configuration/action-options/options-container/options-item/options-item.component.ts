import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Menu } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";
import { ActionRedirectionComponent } from "../../../action-redirection/action-redirection.component";

export interface MenuOption {
    id: number,
    title: string,
    menu?: MenuOption[]
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

    status: boolean;

    toggle = {};

    constructor(private dialog: MatDialog) {
        this.status = false;
    }

    ngOnInit(): void {
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
        this.convertToMenuOption();
    }

    convertToMenuOption(){
        let menuArray = [...this.menuList];
        let newArray = menuArray.reduce((previousValue, currentValue)=>this.reducerNewArray(previousValue, currentValue));
        console.log(newArray);
    }

    reducerNewArray(previousValue, currentValue){
        if (previousValue.options) {
            previousValue.options.filter(n => Number(n.action.split('.')[1]) === currentValue.id);
        }
        let newObject: MenuOption = {
            id: previousValue.id,
            title: previousValue.title,
            //menu: menuaux.length > 0? currentValue : undefined
        }
        return newObject;
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
