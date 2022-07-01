import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Menu } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

@Component({
    selector: "frontend-whatsapp-options-menu-container",
    templateUrl: "./options-menu-container.component.html",
    styleUrls: ["./options-menu-container.component.scss"],
})
export class OptionsMenuContainerComponent implements OnInit {
    @Input()
    data: Menu[];

    @Output()
    newDataEventEmitter = new EventEmitter<Menu[]>();

    toggle = {};

    state: boolean;

    constructor() {
        this.state = true; //create
    }

    ngOnInit(): void {}

    addNewElement(element: string) {
        this.data.push({
            id: this.data.length,
            title: element,
            options: [],
        });
        //this.state = false;
        this.addNewData();
    }

    changeState() {
        //this.state = true;
    }

    deleteItem(id: number) {
        this.data.splice(this.data.indexOf(this.data.filter((n) => n.id === id)[0]), 1);
        this.addNewData();
    }

    updateItem(item: Menu, newTitle: string) {
        let updatedItem = item;
        updatedItem.title = newTitle;
        this.data.splice(this.data.indexOf(this.data.filter((n) => n.id === item.id)[0]), 0, updatedItem);
        this.addNewData();
    }

    addNewData(){
        this.newDataEventEmitter.emit(this.data);
    }

    addNewDataInner(innerItem: Menu, item: Menu){
        this.data[item.id].options.push({
            id: this.data[item.id].options.length,
            value: innerItem.title,
            action: 'hola pepe',
        });
    }
}
