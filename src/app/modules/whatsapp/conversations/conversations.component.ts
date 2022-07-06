import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LayoutService } from "src/@vex/services/layout.service";
import { ProgressService } from "src/app/services/progress.service";

@Component({
    selector: "frontend-whatsapp-conversations",
    templateUrl: "./conversations.component.html",
    styleUrls: ["./conversations.component.scss"],
})
export class ConversationsComponent implements OnInit {
    isFullscreenChatEnabled = false;
    constructor(
        public progressService: ProgressService,
        private route: ActivatedRoute,
        private layoutService: LayoutService
    ) {
        this.route.queryParams.subscribe((params) => {
            params.fullscreenChat === "enabled"
                ? (this.isFullscreenChatEnabled = true)
                : (this.isFullscreenChatEnabled = false);

            if (this.isFullscreenChatEnabled) {
                return this.layoutService.closeSidenav();
            }
            this.layoutService.openSidenav();
        });
    }

    ngOnInit() {}
}
