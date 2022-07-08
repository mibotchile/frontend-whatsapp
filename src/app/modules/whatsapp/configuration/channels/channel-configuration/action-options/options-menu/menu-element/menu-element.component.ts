import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Option } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

@Component({
    selector: "frontend-whatsapp-menu-element",
    templateUrl: "./menu-element.component.html",
    styleUrls: ["./menu-element.component.scss"],
})
export class MenuElementComponent implements OnInit {

    @Output()
    cancelEventEmitter = new EventEmitter<void>();

    @Output()
    acceptEventEmitter = new EventEmitter<string>();

    title: string;

    constructor() {
        this.title = "";
    }

    ngOnInit(): void {}

    cancelMenu() {
        this.cancelEventEmitter.emit();
    }

    acceptMenu() {
        this.acceptEventEmitter.emit(this.title);
    }
}
