import { Component, Input, OnInit } from "@angular/core";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { MatDrawer } from "@angular/material/sidenav";
import { Group } from "../../models/group.model";
import { UserService } from "../../services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ConversationsService } from "src/app/services/conversations.service";

@Component({
    selector: "frontend-whatsapp-conversations-sidenav",
    templateUrl: "./conversations-sidenav.component.html",
    styleUrls: ["./conversations-sidenav.component.scss"],
    animations: [stagger40ms, fadeInUp400ms],
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
        private conversationsService: ConversationsService
    ) {
        const USER_UID = this.authService.getUid();
        this.userService.getUserByUid(USER_UID).subscribe((user) => {
            if (user.success) {
                this.userService.setMyUserId(user.data.id);
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
                        this.selectedGroup = this.groups[0];
                        this.changeGroup(MIS_CONVERSACIONES);
                    }
                });
            }
        });
    }

    ngOnInit(): void {}
    openGroupConversations(group: Group) {
        this.isConversationsPanelShowing = true;
        this.selectedGroup = group;
        this.changeGroup(group);
    }

    changeGroup(group: Group) {
        this.groupsSubject$.next(group);
        this.conversationsService.changeConversation(null);
    }
}
