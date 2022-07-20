import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { MenuService } from "src/app/services/menu.service";
import { ProgressService } from "src/app/services/progress.service";
import menu from "../../../../static-data/menu.json";
import { UserService } from "../services/user.service";

@Component({
    selector: "frontend-whatsapp-configuration",
    templateUrl: "./configuration.component.html",
    styleUrls: ["./configuration.component.scss"],
})
export class ConfigurationComponent implements OnInit, OnDestroy {
    //menu:any = menu;
    menu: any;
    subscription: Subscription;

    constructor(
        public progressService: ProgressService,
        private menuService: MenuService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.subscription = new Subscription();
        this.subscription = this.menuService.getConfigObs().subscribe((response) => {
            this.menu = response;
        });
    }

    menuVisibility(value: string) {
        for (const item of this.menu) {
            for (const i of item.tabs) {
                if (i.name === value) {
                    return true;
                }
            }
        }
        false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
