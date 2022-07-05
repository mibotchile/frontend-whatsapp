import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Option } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";
import { MenuOption } from "../menu-option.interface";

@Component({
    selector: "frontend-whatsapp-options-menu-container",
    templateUrl: "./options-menu-container.component.html",
    styleUrls: ["./options-menu-container.component.scss"],
})
export class OptionsMenuContainerComponent implements OnInit {
    @Input()
    data: Option[];

    @Output()
    newDataEventEmitter = new EventEmitter<Option[]>();

    toggle = {};

    state: boolean;

    constructor() {
        this.state = true; //create
    }

    ngOnInit(): void {}

    addNewElement(element: string) {
        if (element.length>0) {
            this.data.push({
                id: this.data.length,
                value: element,
                action: '',
            });
            //this.state = false;
            this.addNewData();
        }
    }

    changeState() {
        //this.state = true;
    }

    deleteItem(id: number) {
        this.data.splice(this.data.indexOf(this.data.filter((n) => n.id === id)[0]), 1);
        this.addNewData();
    }

    updateItem(item: Option, newTitle: string) {
        let updatedItem = item;
        updatedItem.value = newTitle;
        this.data.splice(this.data.indexOf(this.data.filter((n) => n.id === item.id)[0]), 0, updatedItem);
        this.addNewData();
    }

    addNewData(){
        this.newDataEventEmitter.emit(this.data);
    }

    addNewDataInner(innerItem: Option, item: Option){
        console.log(innerItem);
        console.log(item);
    }
}
