import { Component, Input, OnInit } from "@angular/core";
import { ConversationsSidenavLink } from "./conversations-sidenav-link.interface";

@Component({
    selector: "frontend-whatsapp-conversations-sidenav-link",
    templateUrl: "./conversations-sidenav-link.component.html",
    styleUrls: ["./conversations-sidenav-link.component.scss"],
})
export class ConversationsSidenavLinkComponent implements OnInit {
    @Input() link: ConversationsSidenavLink;

    constructor() {}

    ngOnInit(): void {}
}

