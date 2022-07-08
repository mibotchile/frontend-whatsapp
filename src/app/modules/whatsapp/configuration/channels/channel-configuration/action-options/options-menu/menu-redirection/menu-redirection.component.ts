import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { GroupService } from "src/app/modules/whatsapp/services/group.service";
import { UserService } from "src/app/modules/whatsapp/services/user.service";

interface Item {
    value: string;
    viewValue: string;
}

@Component({
    selector: "frontend-whatsapp-menu-redirection",
    templateUrl: "./menu-redirection.component.html",
    styleUrls: ["./menu-redirection.component.scss"],
})
export class MenuRedirectionComponent implements OnInit {
    @Output()
    cancelEventEmitter = new EventEmitter<void>();

    @Output()
    acceptEventEmiiter = new EventEmitter<void>();

    subscription: Subscription;
    target: string;
    items: Item[];
    selected: number;
    selectedOption: string;
    options: Item[];
    option: string;

    constructor(private groupService: GroupService, private userService: UserService) {}

    ngOnInit(): void {
        this.subscription = new Subscription();
        this.items = [];
        this.options = [
            { value: "user", viewValue: "Usuarios" },
            { value: "group", viewValue: "Grupos" },
        ];
        this.option = "";
    }

    fillList(target: string) {
        this.subscription = new Subscription();
        this.target = target;

        if (target === "user") {
            this.subscription = this.userService.getActiveUsers().subscribe((response: any) => {
                this.items = [];
                response.data.users.forEach((e) => {
                    this.items.push({
                        value: e.id,
                        viewValue: e.name,
                    });
                });
            });
        } else {
            this.subscription = this.groupService.getActiveGroups().subscribe((response: any) => {
                this.items = [];
                response.data.groups.forEach((e) => {
                    this.items.push({
                        value: e.id,
                        viewValue: e.name,
                    });
                });
            });
        }
    }

    cancelRedirection(){
      this.cancelEventEmitter.emit();
    }
}

