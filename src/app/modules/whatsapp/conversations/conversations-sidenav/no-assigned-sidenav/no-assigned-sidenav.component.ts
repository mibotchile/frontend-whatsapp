import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

import arrowLeft from "@iconify/icons-ic/baseline-arrow-back-ios";
import { Observable, Subscription } from "rxjs";
import { ConversationsService } from "src/app/services/conversations.service";
import { conversation } from "../../../Models/conversation.model";
import { Group } from "../../../models/group.model";

@Component({
    selector: "frontend-whatsapp-no-assigned-sidenav",
    templateUrl: "./no-assigned-sidenav.component.html",
    styleUrls: ["./no-assigned-sidenav.component.scss"],
})
export class NoAssignedSidenavComponent implements OnInit, OnDestroy {
    arrowLeft = arrowLeft;

    @Input()
    isConversationsPanelShowing: boolean = false;
    @Input()
    selectedGroupChanges: Observable<Group>;
    selectedGroupChangesSubscription: Subscription;
    @Output()
    closeConversationPanelEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    selectedConversationId: number | string;
    selectedGroup: Group;

    conversations: conversation[] = [];

    constructor(private conversationService: ConversationsService) {}

    ngOnInit(): void {
        this.selectedGroupChangesSubscription = this.selectedGroupChanges.subscribe((group) => {
            this.selectedGroup = group;
            if (this.selectedGroup?.name.toLocaleLowerCase().trim() === "mis conversaciones" || !group) {
                this.conversationService
                    .getUserConversations(this.selectedGroup.id)
                    .subscribe((res: conversation[]) => {
                        this.conversations = res;
                        console.log(res);
                    });
            } else {
                this.conversationService.getConversationsByGroupId(this.selectedGroup?.id).subscribe((res: any) => {
                    this.conversations = res;
                    console.log(res, "----- conve");
                });
            }
        });
    }

    closeConversationsPanel() {
        this.isConversationsPanelShowing = false;
        this.closeConversationPanelEmitter.emit(false);
    }
    openConversation(conversation) {
        this.conversationService.changeConversation(conversation);
        this.selectedConversationId = conversation.id;
    }
    sortByDate(criteria: string) {
        if (criteria.toLocaleLowerCase() === "desc") {
            return console.log(
                this.conversations.sort((conversation1: conversation, conversation2: conversation) =>
                    conversation1.lastMessage.created_at.localeCompare(conversation2.lastMessage.created_at)
                )
            );
        }
        if (criteria.toLocaleLowerCase() === "asc") {
            return this.conversations.sort((conversation1: conversation, conversation2: conversation) =>
                conversation2.lastMessage.created_at.localeCompare(conversation1.lastMessage.created_at)
            );
        }
    }
    ngOnDestroy() {
        this.selectedGroupChangesSubscription.unsubscribe();
    }
}

const CONVERSATIONS_PLACEHOLDER = [
    {
        manager: "2",
        id: 1,
        client_number: "943554023",
        name_client: "Lucía margarita de la plata",
        lastMessage: {
            id: 1,
            message: "Llámame llegando por favor!!",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
    {
        manager: "3",
        id: 2,
        client_number: "943554023",
        name_client: "Pepe le fontiu di la amor",
        lastMessage: {
            id: 1,
            message: "vamos a salir al parque",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
    {
        manager: "4",
        id: 3,
        client_number: "943554023",
        name_client: "Joaquin villalobos del salvador",
        lastMessage: {
            id: 1,
            message: "por favor pido ayuda con mi negocio",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
    {
        manager: "123",
        id: 4,
        client_number: "943554023",
        name_client: "carlos capo ernesto",
        lastMessage: {
            id: 1,
            message: "Muchas gracias por elegirnos",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
    {
        manager: "765",
        id: 6,
        client_number: "943554023",
        name_client: "Lorena villanueva ramirez",
        lastMessage: {
            id: 1,
            message: "La unión hace la fuerza !",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
    {
        manager: "4567",
        id: 7,
        client_number: "943554023",
        name_client: "Jose Luis Perez De los Angeles",
        lastMessage: {
            id: 1,
            message: "esperamos tu solicitud ánimo!",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
    {
        manager: "1231",
        id: 5,
        client_number: "943554023",
        name_client: "Pipo jeréz",
        lastMessage: {
            id: 1,
            message: "tuturuturuturu",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
    {
        manager: "0987",
        id: 8,
        client_number: "943554023",
        name_client: "Juan carlos rodriguez",
        lastMessage: {
            id: 1,
            message: "Lorem ipsum dolor sit amet!!",
            created_at: new Date(2020, 11, 17, 17, 23, 12).toISOString(),
            conversation_id: 5,
            content_type: "image",
            media_url: "www.youtbe.com/'asda",
            from_client: "PROVIDA",
            created_by: "Juan Carlos",
            status: 1,
        },
        newMessagesCount: 5,
    },
];
