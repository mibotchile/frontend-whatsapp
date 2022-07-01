import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import arrowLeft from "@iconify/icons-ic/baseline-arrow-back-ios";
import { conversation } from "../../../interfaces/conversations.interface";

@Component({
    selector: "frontend-whatsapp-no-assigned-sidenav",
    templateUrl: "./no-assigned-sidenav.component.html",
    styleUrls: ["./no-assigned-sidenav.component.scss"],
})
export class NoAssignedSidenavComponent implements OnInit {
    arrowLeft = arrowLeft;

    @Input()
    isConversationsPanelShowing: boolean = false;
    @Input()
    selectedGroup: string = "";
    @Output()
    closeConversationPanelEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    conversations: conversation[] = [
        {
            user: {
                status: 2,
                id: 5,
                uid: "123",
                name: "Lucía margarita de la plata",
                groups_id: [123, 345],
                email: "max.fsmy@gmail.com",
                role_id: 2,
            },
            lastMessageData: {
                id: 1,
                message: "Llámame llegando por favor!!",
                date: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            },
            newMessagesCount: 5,
        },
        {
            user: {
                status: 2,
                id: 5,
                uid: "123",
                name: "Jose Luis Perez De los Angeles",
                groups_id: [123, 345],
                email: "max.fsmy@gmail.com",
                role_id: 2,
            },
            lastMessageData: {
                id: 1,
                message: "www.youtube.com/videos?id=1239584",
                date: new Date(2020, 11, 17).toISOString(),
            },
            newMessagesCount: 5,
        },
        {
            user: {
                status: 2,
                id: 5,
                uid: "123",
                name: "Joaquin",
                groups_id: [123, 345],
                email: "max.fsmy@gmail.com",
                role_id: 2,
            },
            lastMessageData: {
                id: 1,
                message: "vamos a la playa?",
                date: new Date(2020, 11, 17, 12, 23, 12).toISOString(),
            },
            newMessagesCount: 5,
        },
        {
            user: {
                status: 2,
                id: 5,
                uid: "123",
                name: "max",
                groups_id: [123, 345],
                email: "max.fsmy@gmail.com",
                role_id: 2,
            },
            lastMessageData: {
                id: 1,
                message: "Hasta mañana.",
                date: new Date(2020, 11, 17, 19, 43, 12).toISOString(),
            },
            newMessagesCount: 5,
        },
        {
            user: {
                status: 2,
                id: 5,
                uid: "123",
                name: "Roberto nuñez anderson",
                groups_id: [123, 345],
                email: "max.fsmy@gmail.com",
                role_id: 2,
            },
            lastMessageData: {
                id: 1,
                message: "Hola Carlos, recibi tu solicitud ",
                date: new Date(2020, 11, 17, 9, 12, 12).toISOString(),
            },
            newMessagesCount: 5,
        },
        {
            user: {
                status: 2,
                id: 5,
                uid: "123",
                name: "Karma",
                groups_id: [123, 345],
                email: "max.fsmy@gmail.com",
                role_id: 2,
            },
            lastMessageData: {
                id: 1,
                message: "lorem ipsum dolor sit amet",
                date: new Date(2020, 11, 17, 1, 2, 12).toISOString(),
            },
            newMessagesCount: 5,
        },
        {
            user: {
                status: 2,
                id: 5,
                uid: "123",
                name: "Alejandro De la ruiz",
                groups_id: [123, 345],
                email: "max.fsmy@gmail.com",
                role_id: 2,
            },
            lastMessageData: {
                id: 1,
                message: "La base de datos ha sido actualizada",
                date: new Date(2020, 11, 17).toISOString(),
            },
            newMessagesCount: 5,
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    closeConversationsPanel() {
        this.isConversationsPanelShowing = false;
        this.closeConversationPanelEmitter.emit(false);
    }
    sortByDate(criteria: string) {
        if (criteria.toLocaleLowerCase() === "desc") {
            console.log(this.conversations);
            return console.log(
                this.conversations.sort((conversation1: conversation, conversation2: conversation) =>
                    conversation1.lastMessageData.date.localeCompare(conversation2.lastMessageData.date)
                )
            );
        }
        if (criteria.toLocaleLowerCase() === "asc") {
            return this.conversations.sort((conversation1: conversation, conversation2: conversation) =>
                conversation2.lastMessageData.date.localeCompare(conversation1.lastMessageData.date)
            );
        }
    }
}
