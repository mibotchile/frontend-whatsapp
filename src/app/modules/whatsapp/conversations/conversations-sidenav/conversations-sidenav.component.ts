import { Component, Input, OnInit } from "@angular/core";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { ConversationsSidenavLink } from "./conversations-sidenav-link/conversations-sidenav-link.interface";
import icInbox from '@iconify/icons-ic/twotone-inbox';
import icAllInbox from '@iconify/icons-ic/twotone-all-inbox';
import icStar from '@iconify/icons-ic/twotone-star';
import icDrafts from '@iconify/icons-ic/twotone-drafts';
import icSend from '@iconify/icons-ic/twotone-send';
import { MatDrawer } from "@angular/material/sidenav";
import { LayoutService } from "src/@vex/services/layout.service";

@Component({
    selector: "frontend-whatsapp-conversations-sidenav",
    templateUrl: "./conversations-sidenav.component.html",
    styleUrls: ["./conversations-sidenav.component.scss"],
    animations: [stagger40ms, fadeInUp400ms],
})
export class ConversationsSidenavComponent implements OnInit {

    @Input() drawer: MatDrawer;

    links: ConversationsSidenavLink[] = [
        {
            label: "Inbox",
            route: ["./inbox"],
            icon: icInbox,
        },
        {
            label: "All Mails",
            route: ["./all"],
            icon: icAllInbox,
        },
        {
            label: "Starred",
            route: ["./starred"],
            icon: icStar,
        },
        {
            label: "Drafts",
            route: ["./drafts"],
            icon: icDrafts,
        },
        {
            label: "Sent",
            route: ["./sent"],
            icon: icSend,
        },
    ];

    constructor(private layoutService: LayoutService) {}

    ngOnInit(): void {}

    closeDrawer() {
        if (this.layoutService.isLtLg()) {
          this.drawer?.close();
        }
      }
}

