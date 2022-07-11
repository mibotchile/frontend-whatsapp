import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Menu, Option, Redirect } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

@Component({
    selector: "frontend-whatsapp-options-menu",
    templateUrl: "./options-menu.component.html",
    styleUrls: ["./options-menu.component.scss"],
})
export class OptionsMenuComponent implements OnInit {

    @Input()
    menuData: Menu;

    @Input()
    ref: string;

    @Output()
    sendReferenceEmitter = new EventEmitter<string>();

    @Output()
    getMenuEventEmitter = new EventEmitter<string>();

    @Output()
    getRedirecObjectEventEmitter = new EventEmitter<Redirect>();

    @Output()
    deleteMenuEventEmitter = new EventEmitter<void>();

    @Output()
    changeReferenceEventEmitter = new EventEmitter<Option>();

    toggle: boolean;
    status: boolean;
    optionStatus: boolean[];
    redirectionStatus: boolean;
    menuStatus: boolean;
    title: string;

    menu: Menu;
    options: Option[];

    redirectionTitle: string;
    menuTitle: string;

    constructor() {
        this.ref = '';
        this.redirectionTitle = '';
        this.menuTitle = '';
    }

    ngOnInit(): void {
        this.menu = this.menuData;
        this.title = this.menu.title;
        this.options = this.menu.options;
        this.optionStatus = [];
        this.menuStatus = false;
        this.redirectionStatus = false;

        this.optionStatus = this.options.map((x) => false);
    }

    addOption(id: number) {
        this.options.splice(id + 1, 0, {
            id: 0,
            action: "action",
            value: "Opción",
        });

        this.options.forEach((e, i) => {
            e.id = i;
        });
        console.log(this.menu);
    }

    updateOption(id: number) {
        this.optionStatus[id] = true;
    }

    deleteOption(id: number) {
        this.options.splice(id, 1);

        this.options.forEach((e, i) => {
            e.id = i;
        });
        console.log(this.options);
    }

    deleteMenu(){
        this.deleteMenuEventEmitter.emit();
    }

    openRedirection(id: number,value: string) {
        this.redirectionTitle = value;
        this.redirectionStatus = true;
        this.options[id].action = 'redirect';
    }

    openMenu(id: number,value: string) {
        this.menuTitle = value;
        this.menuStatus = true;
        this.options[id].action = 'menu';
        this.sendReferenceEmitter.emit(this.options[id].value);
    }

    getMenuTitle(title: string) {
        this.menuStatus = false;
        this.getMenuEventEmitter.emit(title);
    }

    getRedirecObject(redirect: Redirect){
        this.redirectionStatus = false;
        this.getRedirecObjectEventEmitter.emit(redirect);
    }

    changeReference(option: Option){
        this.changeReferenceEventEmitter.emit(option);
    }
}
