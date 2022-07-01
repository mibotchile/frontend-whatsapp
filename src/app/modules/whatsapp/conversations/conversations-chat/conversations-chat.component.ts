import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";

import usersData from "./../../../../../static-data/users.json";
import chatMessages from "./../../../../../static-data/chatMessages.json";

import send from "@iconify/icons-ic/twotone-send";
import asign from "@iconify/icons-ic/twotone-person-pin";
import fullscreen from "@iconify/icons-ic/baseline-fullscreen";

import { Message } from "../../interfaces/conversations.interface";
import { User } from "../../models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ConversationsService } from "src/app/services/conversations.service";

@Component({
    selector: "frontend-whatsapp-conversations-chat",
    templateUrl: "./conversations-chat.component.html",
    styleUrls: ["./conversations-chat.component.scss"],
})
export class ConversationsChatComponent implements AfterViewInit, OnDestroy {
    @ViewChild("messagesContainer") messagesContainer: ElementRef;

    isFullscreenEnabled = false;

    isLoadingMessages = false;
    messagesQuantityToLoad = 5;
    messagesQuantityLoaded = 0;

    usersToAssign: User[] = [];

    send = send;
    asign = asign;
    fullscreen = fullscreen;

    message: string = "";
    chatMessages: Message[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private conversationsService: ConversationsService
    ) {
        this.route.queryParams.subscribe((params) =>
            params.fullscreenChat === "enabled" ? (this.isFullscreenEnabled = true) : (this.isFullscreenEnabled = false)
        );
        this.usersToAssign = usersData;

        // setTimeout(() => {
        //     const PLACEHOLDER_MESSAGES = chatMessages
        //         .reverse()
        //         .splice(this.messagesQuantityLoaded, this.messagesQuantityToLoad);
        //     this.messagesQuantityLoaded += this.messagesQuantityToLoad;
        //     console.log(PLACEHOLDER_MESSAGES);
        //     this.chatMessages.unshift(...PLACEHOLDER_MESSAGES);
        //     this.isLoadingMessages = false;
        // }, 2000);
    }
    ngAfterViewInit() {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        // this.messagesContainer.nativeElement.addEventListener("scroll", () =>
        //     this.showOldMessagesOnScrollNearTop(this.messagesContainer.nativeElement)
        // );
    }
    sendMessage() {
        if (!this.message.trim()) return;
        this.chatMessages.push({
            id: "1",
            message: this.message,
            date: new Date().toLocaleDateString(),
            // status: "seen",
        });
        this.message = "";
        this.cd.detectChanges();
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
    toggleFullscreenChat(e: Event) {
        e.preventDefault();
        console.log(this.isFullscreenEnabled);
        this.router.navigate(["whatsapp/conversations"], {
            queryParams: !this.isFullscreenEnabled ? { fullscreenChat: "enabled" } : {},
            queryParamsHandling: "",
        });
    }
    // showOldMessagesOnScrollNearTop(scrollableElement: HTMLElement) {
    //     if (scrollableElement.scrollTop < 100) {
    //         this.isLoadingMessages = true;
    //         setTimeout(() => {
    //             const PLACEHOLDER_MESSAGES = chatMessages
    //                 .reverse()
    //                 .splice(this.messagesQuantityLoaded, this.messagesQuantityToLoad);
    //             if (PLACEHOLDER_MESSAGES.length > 1) return (this.isLoadingMessages = false);
    //             this.messagesQuantityLoaded += this.messagesQuantityToLoad;
    //             this.chatMessages.unshift(PLACEHOLDER_MESSAGES);
    //             this.isLoadingMessages = false;
    //         }, 2000);
    //     }
    // }
    ngOnDestroy() {
        // this.messagesContainer.nativeElement.removeEventListener("scroll", () =>
        //     this.showOldMessagesOnScrollNearTop(this.messagesContainer.nativeElement)
        // );
    }
}
