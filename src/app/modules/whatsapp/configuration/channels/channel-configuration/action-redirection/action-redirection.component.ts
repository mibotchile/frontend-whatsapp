import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import icClose from "@iconify/icons-ic/twotone-close";
import icPeople from "@iconify/icons-ic/people";
import { GroupService } from "src/app/modules/whatsapp/services/group.service";
import { UserService } from "src/app/modules/whatsapp/services/user.service";
import { Subscription } from "rxjs";
import { Redirect } from "src/app/modules/whatsapp/interfaces/channel-configuration.interface";

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
    target: string;
    action: string;
    selectedOption: string;

    redirect: Redirect;

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
        this.action = "noaction";

        if (this.defaults.id) {
            this.mode = "update";
            this.action = "update";
            this.redirect = this.defaults.configuration.redirects[this.defaults.id];
            this.selectedOption = this.redirect.to.split(".")[0];
            this.fillList(this.redirect.to.split(".")[0]);
            this.selected = Number(this.redirect.to.split(".")[1]);
        } else {
            this.redirect = {
                id: this.defaults.redirectId,
                to: "",
            };
        }

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

    createObject(selected: number, action: string) {
        let redirect = {
            id: this.defaults.redirectId,
            to: `${action}.${selected}`,
        };

        return redirect;
    }

    createRedirection() {
        this.action = "create";
        this.defaults.configuration.redirects.push(this.createObject(this.selected, this.target));
        this.dialogRef.close([this.defaults.configuration, this.action]);
    }

    updateRedirection() {
        this.action = 'update';
        this.defaults.configuration.redirects.splice(this.defaults.id,1,this.createObject(this.selected, this.target));
        this.dialogRef.close([this.defaults.configuration,this.action]);
    }

    save() {
        if (this.mode === "create") {
            this.createRedirection();
        } else if (this.mode === "update") {
            this.updateRedirection();
        }
    }

    isCreateMode() {
        return this.mode === "create";
    }

    isUpdateMode() {
        return this.mode === "update";
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.dialogRef.close([this.defaults.configuration, this.action]);
    }
}
