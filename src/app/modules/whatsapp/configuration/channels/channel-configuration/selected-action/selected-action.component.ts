import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import { Item } from "../item.interface";

@Component({
    selector: "frontend-whatsapp-selected-action",
    templateUrl: "./selected-action.component.html",
    styleUrls: ["./selected-action.component.scss"],
})
export class SelectedActionComponent implements OnInit {

    icEdit = icEdit;
    icDelete = icDelete;

    @Input()
    label: Item;
    @Input()
    position: string;

    @Output()
    deleteItemEvent = new EventEmitter<void>();

    @Output()
    updateItemEvent = new EventEmitter<string>();

    constructor() {}

    ngOnInit(): void {}

    onDelete(){
        this.deleteItemEvent.emit();
    }

    onUpdate(action: string){
        this.updateItemEvent.emit(action);
    }

}

