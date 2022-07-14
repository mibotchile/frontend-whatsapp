import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

import arrowLeft from "@iconify/icons-ic/baseline-arrow-back-ios";
import dropDownArrow from "@iconify/icons-ic/baseline-arrow-drop-down";

import { Observable, Subscription } from "rxjs";
import { ConversationsService } from "src/app/services/conversations.service";
import { WebsocketsService } from "src/app/services/websockets.service";
import { conversation } from "../../../Models/conversation.model";
import { Group } from "../../../models/group.model";
import { Message } from "../../../Models/Message.model";
import { User } from "../../../models/user.model";
import { GroupService } from "../../../services/group.service";
import { UserService } from "../../../services/user.service";

@Component({
    selector: "frontend-whatsapp-no-assigned-sidenav",
    templateUrl: "./no-assigned-sidenav.component.html",
    styleUrls: ["./no-assigned-sidenav.component.scss"],
})
export class NoAssignedSidenavComponent implements OnInit, OnDestroy {
    arrowLeft = arrowLeft;
    dropDownArrow = dropDownArrow;

    @Input()
    isConversationsPanelShowing: boolean = false;
    @Input()
    selectedGroupChanges: Observable<Group>;
    selectedGroupChangesSubscription: Subscription;
    @Output()
    closeConversationPanelEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    selectedConversationId: number;
    selectedGroup: any;

    conversations: conversation[] = [];
    lastRemovedConversationId: number;

    constructor(
        private conversationService: ConversationsService,
        private webSocketsService: WebsocketsService,
        private userService: UserService,
        private groupService: GroupService
    ) {
        this.userService.onMyUserIdChanges$.subscribe((user: User) => {
            this.webSocketsService.on("new_conversation").subscribe((conversation: conversation) => {
                console.log(user);
                const CONVERSATION_GROUP_ID = Number(conversation.manager.replace(/^\D+/g, ""));
                if (
                    this.lastRemovedConversationId === conversation.id ||
                    CONVERSATION_GROUP_ID !== this.selectedGroup.id
                ) {
                    return (this.lastRemovedConversationId = undefined);
                }
                const GROUP_CONVERSATION_ID = Number(conversation.manager.replace(/^\D+/g, ""));
                if (conversation.manager.toLowerCase().includes("group")) {
                    if (this.selectedGroup.id === GROUP_CONVERSATION_ID) {
                        this.conversations.unshift(conversation);
                    }
                }
                if (conversation.manager.toLowerCase().includes("user")) {
                    if (!user) return;
                    if (this.userService.user.id === GROUP_CONVERSATION_ID) {
                        this.conversations.unshift(conversation);
                    }
                }
            });
        });
        this.conversationService.conversationSelection$.subscribe((newSelectedConversation: conversation) => {
            console.log(newSelectedConversation);
            if (newSelectedConversation === null && this.selectedConversationId) {
                this.lastRemovedConversationId = this.selectedConversationId;
                const CONVERSATION_INDEX = this.conversations.findIndex(
                    (conversation) => (conversation.id = this.selectedConversationId)
                );
                console.log(CONVERSATION_INDEX);
                this.conversations.splice(CONVERSATION_INDEX, 1);
                this.selectedConversationId = null;
            }
        });
    }

    ngOnInit(): void {
        this.selectedGroupChangesSubscription = this.groupService.groupChangesListener$.subscribe((group) => {
            console.log(group);
            if (!group) return;
            this.selectedGroup = group;
            if (this.selectedGroup?.name.toLowerCase().trim() === "mis conversaciones") {
                this.conversationService
                    .getUserConversations(this.selectedGroup.id.replace("user_", ""))
                    .subscribe((res: conversation[]) => {
                        this.conversations = res;
                        console.log(res, "----- conve");
                    });
            } else {
                this.conversationService.getConversationsByGroupId(this.selectedGroup?.id).subscribe((res: any) => {
                    this.conversations = res;
                    console.log(res, "----- conve");
                    console.log(this.selectedGroup, "----- group");
                });
            }
        });
        this.webSocketsService.on("whatsapp_message_received").subscribe((message: Message) => {
            const CONVERSATION_INDEX = this.conversations.findIndex((con) => con.id === message.conversation_id);
            if (CONVERSATION_INDEX === -1) return;
            this.conversations[CONVERSATION_INDEX].last_message.message = message.message;
            if (message.conversation_id != this.selectedConversationId) {
                console.log(this.conversations[CONVERSATION_INDEX].newMessagesCount);
                this.conversations[CONVERSATION_INDEX].newMessagesCount =
                    this.conversations[CONVERSATION_INDEX].newMessagesCount < 1 ||
                    this.conversations[CONVERSATION_INDEX].newMessagesCount === undefined
                        ? 1
                        : this.conversations[CONVERSATION_INDEX].newMessagesCount + 1;
                this.conversations[CONVERSATION_INDEX].last_message.created_at = message.created_at;
                console.log(this.conversations[CONVERSATION_INDEX].newMessagesCount);
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
        const CONVERSATION_INDEX = this.conversations.findIndex((con) => con.id === this.selectedConversationId);
        this.conversations[CONVERSATION_INDEX].newMessagesCount = 0;
    }
    sortByDate(criteria: string) {
        if (criteria.toLowerCase() === "desc") {
            return console.log(
                this.conversations.sort((conversation1: conversation, conversation2: conversation) =>
                    conversation1.last_message.created_at.localeCompare(conversation2.last_message.created_at)
                )
            );
        }
        if (criteria.toLowerCase() === "asc") {
            return this.conversations.sort((conversation1: conversation, conversation2: conversation) =>
                conversation2.last_message.created_at.localeCompare(conversation1.last_message.created_at)
            );
        }
    }
    ngOnDestroy() {
        this.selectedGroupChangesSubscription.unsubscribe();
    }
}
