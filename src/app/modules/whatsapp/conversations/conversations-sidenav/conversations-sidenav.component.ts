import { Component, Input, OnInit } from "@angular/core";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { MatDrawer } from "@angular/material/sidenav";
import { Group } from "../../models/group.model";

@Component({
    selector: "frontend-whatsapp-conversations-sidenav",
    templateUrl: "./conversations-sidenav.component.html",
    styleUrls: ["./conversations-sidenav.component.scss"],
    animations: [stagger40ms, fadeInUp400ms],
})
export class ConversationsSidenavComponent implements OnInit {
    isConversationsPanelShowing: boolean = false;
    selectedGroup: string = "";

    @Input() drawer: MatDrawer;

    conversationGroups: Group[] = [
        {
            id: 1,
            name: "Mis conversaciones",
            conversationsCount: 0,
            description: "",
            tags: [],
            default: true,
            status: 1,
        },
        {
            id: 5,
            name: "Grupo 1",
            conversationsCount: 5,
            description: "",
            tags: [],
            default: true,
            status: 1,
        },
        {
            id: 5,
            name: "Grupo 2",
            conversationsCount: 22,
            description: "",
            tags: [],
            default: true,
            status: 1,
        },
        {
            id: 5,
            name: "Grupo Provida",
            conversationsCount: 1,
            description: "",
            tags: [],
            default: true,
            status: 1,
        },
    ];

    constructor() {}

    ngOnInit(): void {}
    openGroupConversations(group: Group) {
        this.isConversationsPanelShowing = true;
        this.selectedGroup = group.name;
    }
}
