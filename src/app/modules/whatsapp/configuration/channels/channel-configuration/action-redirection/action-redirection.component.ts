import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icPeople from "@iconify/icons-ic/people";
import { GroupService } from "src/app/modules/whatsapp/services/group.service";
import { UserService } from "src/app/modules/whatsapp/services/user.service";
import { Subscription } from "rxjs";

interface Item {
    value: string;
    viewValue: string;
}

@Component({
    selector: "frontend-whatsapp-action-redirection",
    templateUrl: "./action-redirection.component.html",
    styleUrls: ["./action-redirection.component.scss"],
})
export class ActionRedirectionComponent implements OnInit, OnDestroy {
    icClose = icClose;
    icPeople = icPeople;

    option: string;
    options: Item[];

    form: FormGroup;
    mode: "create" | "update" = "create";

    selected: number;
    selectedOption: number;

    subscription: Subscription;

    items: Item[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public defaults: any,
        private dialogRef: MatDialogRef<ActionRedirectionComponent>,
        private fb: FormBuilder,
        private groupService: GroupService,
        private userService: UserService
    ) {}

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

        this.defaults.configuration.redirections = this.createObject(this.selected, target);
        console.log(this.createObject(this.selected, target));
    }

    createObject(selected: number, action: string) {
        console.log(selected,action)
        let redirect = {
            id: 0,
            to: `${{ action }}.${{ selected }}`,
        };

        return redirect;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

