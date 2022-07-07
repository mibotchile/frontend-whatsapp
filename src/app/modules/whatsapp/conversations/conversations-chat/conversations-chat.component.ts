import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";

import chatMessages from "../../../../../static-data/chatMessages.json";

import send from "@iconify/icons-ic/twotone-send";
import asign from "@iconify/icons-ic/twotone-person-pin";
import fullscreen from "@iconify/icons-ic/round-open-in-new";
import doubleCheck from "@iconify/icons-ic/baseline-done-all";

import { User } from "../../models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ConversationsService } from "src/app/services/conversations.service";
import { WebsocketsService } from "src/app/services/websockets.service";
import { UserService } from "../../services/user.service";
import { conversation } from "../../Models/conversation.model";
import { Message } from "../../Models/Message.model";
import { GroupService } from "../../services/group.service";
import { Group } from "../../models/group.model";

interface ownMessage {
    message: string;
    created_at: string | number;
    created_by: string | number;
    id: string | number;
}

@Component({
    selector: "frontend-whatsapp-conversations-chat",
    templateUrl: "./conversations-chat.component.html",
    styleUrls: ["./conversations-chat.component.scss"],
})
export class ConversationsChatComponent implements AfterViewInit, OnDestroy {
    @ViewChild("messagesContainer") messagesContainer: ElementRef;

    isFullscreenEnabled = false;
    isScrollPosAtTheEnd = true;
    isConversationLoading = false;
    isLoadingMessages = false;

    userId: number;

    messagesQuantityToLoad = 5;
    messagesQuantityLoaded = 0;

    selectedConversation: conversation;
    selectedGroup: Group;

    usersToAssign: User[] = [];

    send = send;
    asign = asign;
    fullscreen = fullscreen;
    doubleCheck = doubleCheck;

    message: string = "";
    chatMessages: Array<ownMessage | Message> = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private websocketService: WebsocketsService,
        private userService: UserService,
        private conversationsService: ConversationsService,
        private groupService: GroupService
    ) {
        if (this.userService.userId) {
            this.userId = this.userService.userId;
        } else {
            this.userService.onMyUserIdChanges$.subscribe((userId) => {
                this.userId = userId;
            });
        }
        this.groupService.groupChangesListener$.subscribe((group: Group) => {
            if (!group) return;
            this.selectedGroup = group;
        });
        this.setupWebSockets();
        this.setupConversationsSockets();
        this.route.queryParams.subscribe((params) =>
            params.fullscreenChat === "enabled" ? (this.isFullscreenEnabled = true) : (this.isFullscreenEnabled = false)
        );

        this.userService.getActiveUsers().subscribe((activeUsers: any) => {
            this.usersToAssign = activeUsers.data.users;
        });
        this.conversationsService.conversationSelection$.subscribe((conversationInfo: conversation) => {
            if (!conversationInfo) {
                if (this.messagesContainer?.nativeElement) this.removeChatScrollActions();
                this.selectedConversation = undefined;
                return (this.chatMessages = []);
            }
            if (this.selectedConversation?.id === conversationInfo.id) return;
            this.chatMessages = [];
            this.selectedConversation = conversationInfo;
            this.conversationsService
                .getPaginatedMessages(
                    this.selectedConversation.id,
                    this.messagesQuantityToLoad,
                    this.messagesQuantityLoaded
                )
                .subscribe((oldMessages: Message[]) => {
                    this.addChatScrollActions();
                    console.log(oldMessages);
                    oldMessages = oldMessages.map((message) => ({
                        ...message,
                        created_at: new Date(message.created_at).toISOString(),
                    }));
                    this.chatMessages.push(...oldMessages);
                    this.sortMessagesByDate(this.chatMessages);
                    this.cd.detectChanges();
                    this.scrollChatToBottom();
                });
            this.chatMessages = [];
            this.isConversationLoading = false;
            // setTimeout(() => {
            //     const PLACEHOLDER_MESSAGES = chatMessages.map((message) => ({ ...message, date: new Date() }));
            //     // this.messagesQuantityLoaded += this.messagesQuantityToLoad;
            //     this.chatMessages.unshift(...PLACEHOLDER_MESSAGES);
            //     this.isConversationLoading = false;
            //     this.cd.detectChanges();
            //     this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
            // }, 2000);
        });
    }
    ngAfterViewInit() {}
    sendMessage() {
        if (!this.message.trim()) return;
        const MESSAGE_DATA = {
            message: this.message,
            channelNumber: "+9884522222",
            clientNumber: this.selectedConversation.client_number,
            conversationId: this.selectedConversation?.id,
        };
        // this.appendMessageInChat({
        //     id: "",
        //     created_by: this.userId,
        //     created_at: new Date().toISOString(),
        //     message: this.message,
        // });
        // this.scrollChatToBottom();
        this.message = "";
        this.websocketService.emit("send_message", MESSAGE_DATA);
    }
    toggleFullscreenChat(e: Event) {
        e.preventDefault();
        this.router.navigate(["whatsapp/conversations"], {
            queryParams: !this.isFullscreenEnabled ? { fullscreenChat: "enabled" } : {},
            queryParamsHandling: "",
        });
    }

    appendMessageInChat(message: Message | ownMessage) {
        this.chatMessages.push(message);
        this.sortMessagesByDate(this.chatMessages);
        this.cd.detectChanges();
    }

    sortMessagesByDate(array: Array<Message | ownMessage>) {
        return array.sort((currentMessage: Message, nextMessage: Message) =>
            currentMessage.created_at.localeCompare(nextMessage.created_at)
        );
    }
    showOldMessagesOnScrollNearTop(scrollableElement: HTMLElement) {
        if (scrollableElement.scrollTop < 100) {
            if (this.isLoadingMessages || this.isConversationLoading) return;
            this.isLoadingMessages = true;
            const LAST_SCROLL_HEIGHT = scrollableElement.scrollHeight;
            // setTimeout(() => {
            //     const PLACEHOLDER_MESSAGES = chatMessages;
            //     if (PLACEHOLDER_MESSAGES.length < 1) return (this.isLoadingMessages = false);
            //     // this.messagesQuantityLoaded += this.messagesQuantityToLoad;
            //     const LAST_SCROLL_POS = scrollableElement.scrollTop;
            //     this.chatMessages.unshift(...PLACEHOLDER_MESSAGES);
            //     this.isLoadingMessages = false;
            //     this.cd.detectChanges();
            //     const SCROLL_HEIGHT_DIFF = scrollableElement.scrollHeight - LAST_SCROLL_HEIGHT;
            //     const SPINNER_TOTAL_HEIGHT = 78;
            //     scrollableElement.scrollTop =
            //         LAST_SCROLL_POS === 0
            //             ? SCROLL_HEIGHT_DIFF - SPINNER_TOTAL_HEIGHT
            //             : scrollableElement.scrollTop + SCROLL_HEIGHT_DIFF;
            // }, 2000);
        }
    }
    showAttachedDateToTop(scrollableElement: HTMLElement) {
        if (scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight - 50) {
            this.isScrollPosAtTheEnd = true;
        } else {
            this.isScrollPosAtTheEnd = false;
        }
    }

    setupWebSockets() {
        this.websocketService.connect();
        this.websocketService.on("connect").subscribe(() => {
            console.log("websockets connection established");
        });
        this.websocketService.on("whatsapp_message_received").subscribe((receivedMessage: Message) => {
            console.log(receivedMessage);
            if (!receivedMessage.from_client && !(receivedMessage.created_by === "system")) return;
            this.conversationsService.changeConversation({
                ...this.selectedConversation,
                last_message: {
                    ...receivedMessage,
                    message: !receivedMessage.from_client ? `Tú: ${receivedMessage.message}` : receivedMessage.message,
                },
            });
            if (this.selectedConversation.id != receivedMessage.conversation_id) return;
            receivedMessage.created_at = receivedMessage.created_at.replace(" ", "T") + "Z";
            this.appendMessageInChat(receivedMessage);
            this.scrollChatToBottom();
        });
    }
    setupConversationsSockets() {
        this.conversationsService.connect();
        this.conversationsService.on("connect").subscribe(() => {
            console.log("websockets connection established");
        });
        this.conversationsService.on("new_conversation").subscribe((conversation) => {
            console.log(conversation);
        });
    }
    redirectConversation() {
        if (!this.selectedConversation?.id || !this.userId) return;
        const PAYLOAD = {
            conversationId: this.selectedConversation.id,
            manager: "user",
            managerId: this.userId,
        };
        this.conversationsService.emit("redirect_conversation", PAYLOAD);
    }
    scrollChatToBottom() {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }

    ngOnDestroy() {
        this.removeChatScrollActions();
        this.conversationsService.disconnect();
        this.websocketService.disconnect();
    }
    addChatScrollActions() {
        this.messagesContainer.nativeElement.addEventListener("scroll", () => {
            this.showOldMessagesOnScrollNearTop(this.messagesContainer.nativeElement);
            this.showAttachedDateToTop(this.messagesContainer.nativeElement);
        });
    }
    removeChatScrollActions() {
        this.messagesContainer.nativeElement.removeEventListener("scroll", () => {
            this.showOldMessagesOnScrollNearTop(this.messagesContainer.nativeElement);
            this.showAttachedDateToTop(this.messagesContainer.nativeElement);
        });
    }
}
