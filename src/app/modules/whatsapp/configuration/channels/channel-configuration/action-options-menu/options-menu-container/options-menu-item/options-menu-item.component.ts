import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Option } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";
import { ActionRedirectionComponent } from "../../../action-redirection/action-redirection.component";
import { MenuOption } from "../../menu-option.interface";

@Component({
    selector: "frontend-whatsapp-options-menu-item",
    templateUrl: "./options-menu-item.component.html",
    styleUrls: ["./options-menu-item.component.scss"],
})
export class OptionsMenuItemComponent implements OnInit {

    @Input()
    element: MenuOption;

    @Output()
    addItemEventEmitter = new EventEmitter<void>();

    @Output()
    addLevelEventEmitter = new EventEmitter<void>();

    @Output()
    editItemEventEmitter = new EventEmitter<string>();

    @Output()
    deleteItemEventEmitter = new EventEmitter<void>();

    status: boolean;

    constructor(private dialog: MatDialog) {
        this.status = false;
    }

    ngOnInit(): void {}

    newItem(){
        this.addItemEventEmitter.emit();
    }

    newLevel(){
        this.addLevelEventEmitter.emit();
    }

    sendEditItem(){
        this.editItemEventEmitter.emit(this.element.title);
    }

    editItem(){
        this.status = true; //edit
    }

    deleteItem(){
        this.deleteItemEventEmitter.emit();
    }

    openRedirectionDialog(){
        this.dialog.open(ActionRedirectionComponent);
    }

}
