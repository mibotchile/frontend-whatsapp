import { Component, Input, OnInit } from "@angular/core";
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes,
    // ...
} from "@angular/animations";

import { MatDrawer } from "@angular/material/sidenav";
import { Group } from "../../models/group.model";
import { UserService } from "../../services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ConversationsService } from "src/app/services/conversations.service";
import { WebsocketsService } from "src/app/services/websockets.service";
import { conversation } from "../../Models/conversation.model";
import { GroupService } from "../../services/group.service";

@Component({
    selector: "frontend-whatsapp-conversations-sidenav",
    templateUrl: "./conversations-sidenav.component.html",
    styleUrls: ["./conversations-sidenav.component.scss"],
    animations: [
        trigger("loadingData", [
            transition("void => *", [
                animate(
                    "2s",
                    keyframes([
                        style({ backgroundColor: "#EAEAEA", offset: 0 }),
                        style({ backgroundColor: "#BDBDBD", offset: 1.0 }),
                    ])
                ),
            ]),
        ]),
    ],
})
export class ConversationsSidenavComponent implements OnInit {
    groupsSubject$: BehaviorSubject<Group | null> = new BehaviorSubject<Group | null>(null);
    changeSelectedGroupSuscriber$: Observable<Group> = this.groupsSubject$.asObservable();

    isConversationsPanelShowing: boolean = true;
    selectedGroup: Group;

    @Input() drawer: MatDrawer;

    groups: Group[] = [];

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private conversationsService: ConversationsService,
        private webSocketsService: WebsocketsService,
        private groupService: GroupService
    ) {
        const USER_UID = this.authService.getUid();
        this.userService.getUserByUid(USER_UID).subscribe((user) => {
            if (user.success) {
                this.userService.setMyUserId(user.data);
                this.userService.getGroups(user.data.id).subscribe((res: any) => {
                    if (res.success) {
                        const MIS_CONVERSACIONES: Group = {
                            id: user.data.id,
                            name: "Mis conversaciones",
                            description: "mis conversaciones description",
                            tags: [],
                            default: true,
                            status: 1,
                        };
                        this.groups.push(MIS_CONVERSACIONES, ...res.data);
                        this.openGroupConversations(MIS_CONVERSACIONES);
                    }
                });
            }
        });
        this.webSocketsService.on("new_conversation").subscribe((conversation: conversation) => {
            const GROUP_CONVERSATION_ID = Number(conversation.manager.replace(/^\D+/g, ""));
            if (this.selectedGroup?.id != GROUP_CONVERSATION_ID) {
                console.log(GROUP_CONVERSATION_ID, this.groups, conversation);
                const GROUP_INDEX = this.groups.findIndex((group) => GROUP_CONVERSATION_ID === group.id);
                if (GROUP_INDEX < 0) return;
                if (conversation.manager.includes("user")) {
                    if (this.groups[GROUP_INDEX].name.toLowerCase().trim() === "mis conversaciones") {
                        this.groups[GROUP_INDEX].conversationsCount =
                            this.groups[GROUP_INDEX].conversationsCount < 1 ||
                            this.groups[GROUP_INDEX].conversationsCount === undefined
                                ? 1
                                : this.groups[GROUP_INDEX].conversationsCount + 1;
                    }
                }
                if (conversation.manager.includes("group")) {
                    if (this.groups[GROUP_INDEX].name.toLowerCase().trim() !== "mis conversaciones") {
                        this.groups[GROUP_INDEX].conversationsCount =
                            this.groups[GROUP_INDEX].conversationsCount < 1 ||
                            this.groups[GROUP_INDEX].conversationsCount === undefined
                                ? 1
                                : this.groups[GROUP_INDEX].conversationsCount + 1;
                    }
                }
            }
        });
    }

    ngOnInit(): void {}
    openGroupConversations(group: Group) {
        this.selectedGroup = group;

        this.isConversationsPanelShowing = true;
        this.changeGroup(group);
    }

    changeGroup(group: Group) {
        this.cleanConversationsCounter(group.id);
        this.groupService.changeGroup(group);
        this.conversationsService.changeConversation(null);
    }
    cleanConversationsCounter(groupId: number) {
        const GROUP_INDEX = this.groups.findIndex((group) => group.id === groupId);
        this.groups[GROUP_INDEX].conversationsCount = 0;
    }
}
