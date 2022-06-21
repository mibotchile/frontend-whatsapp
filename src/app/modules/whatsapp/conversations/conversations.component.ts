import { Component, OnInit } from "@angular/core";
import { ProgressService } from "src/app/services/progress.service";

@Component({
    selector: "frontend-whatsapp-conversations",
    templateUrl: "./conversations.component.html",
    styleUrls: ["./conversations.component.scss"],
})
export class ConversationsComponent implements OnInit {
    constructor(public progressService: ProgressService) {}

    ngOnInit() {}
}
