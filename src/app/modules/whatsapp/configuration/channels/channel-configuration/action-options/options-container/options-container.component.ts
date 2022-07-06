import { Component, OnInit } from "@angular/core";
import { Menu } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

@Component({
    selector: "frontend-whatsapp-options-container",
    templateUrl: "./options-container.component.html",
    styleUrls: ["./options-container.component.scss"],
})
export class OptionsContainerComponent implements OnInit {
    menuList: Menu[];

    constructor() {}

    ngOnInit(): void {
        this.menuList = [
            {
                id: 0,
                title: 'root',
                options: [
                    {
                        id: 0,
                        value: 'Menu 1',
                        action: 'menu.1'
                    },
                    {
                        id: 1,
                        value: 'Menu 2',
                        action: 'menu.2'
                    },
                    {
                        id: 2,
                        value: 'Redirect 1',
                        action: 'redirect.1'
                    }
                ]
            },
            {
                id: 1,
                title: 'Menu 1',
                options: [
                    {
                        id: 0,
                        value: 'Redirect 2',
                        action: 'redirect.2'
                    },
                    {
                        id: 1,
                        value: 'Redirect 3',
                        action: 'redirect.3'
                    },
                    {
                        id: 2,
                        value: 'Redirect 4',
                        action: 'redirect.4'
                    }
                ]
            },
            {
                id: 2,
                title: 'Menu 2',
                options: [
                    {
                        id: 0,
                        value: 'Redirect 5',
                        action: 'redirect.5'
                    },
                    {
                        id: 1,
                        value: 'Redirect 6',
                        action: 'redirect.6'
                    },
                    {
                        id: 2,
                        value: 'Redirect 7',
                        action: 'redirect.7'
                    }
                ]
            }
        ]
    }

}
