import { Component, OnInit, ViewChild } from "@angular/core";
import { LayoutService } from "../../@vex/services/layout.service";
import { filter, map, startWith } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";
import { checkRouterChildsData } from "../../@vex/utils/check-router-childs-data";
import { BreakpointObserver } from "@angular/cdk/layout";
import { ConfigService } from "../../@vex/services/config.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { SidebarComponent } from "../../@vex/components/sidebar/sidebar.component";
import { config, forkJoin, Observable, Subscription } from "rxjs";
import { UserService } from "../modules/whatsapp/services/user.service";
import { AuthService } from "../services/auth.service";
import { RoleService } from "../modules/whatsapp/services/role.service";
import { MenuService } from "../services/menu.service";
import { NavigationService } from "src/@vex/services/navigation.service";
import icHome from "@iconify/icons-ic/round-whatsapp";

@UntilDestroy()
@Component({
    selector: "vex-custom-layout",
    templateUrl: "./custom-layout.component.html",
    styleUrls: ["./custom-layout.component.scss"],
})
export class CustomLayoutComponent implements OnInit {
    subscription: Subscription;

    menuItems: any = {};
    //menu: any = JSON.parse(localStorage.getItem('config'));
    menu: any;
    newItems: any = {};

    items: any = [
        {
            type: "dropdown",
            label: "Whatsapp",
            //route: '/',
            icon: icHome,
            //routerLinkActiveOptions: { exact: true },
            children: [
                {
                    type: "link",
                    label: "Conversaciones",
                    name: "conversation",
                    route: "/apps/chat",
                },
                {
                    type: "link",
                    label: "Configuracion",
                    name: "settings",
                    route: "/whatsapp/configuration",
                },
            ],
        },
    ];

    sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
    isFooterVisible$ = this.configService.config$.pipe(map((config) => config.footer.visible));
    isDesktop$ = this.layoutService.isDesktop$;

    toolbarShadowEnabled$ = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => checkRouterChildsData(this.router.routerState.root.snapshot, (data) => data.toolbarShadowEnabled))
    );

    @ViewChild("configpanel", { static: true }) configpanel: SidebarComponent;

    constructor(
        private layoutService: LayoutService,
        private configService: ConfigService,
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private menuService: MenuService,
        private navigationService: NavigationService
    ) {}

    ngOnInit() {
        //this.loadConfigByUid(this.authService.getUid())
        this.layoutService.configpanelOpen$.pipe(untilDestroyed(this)).subscribe((open) => (open ? this.configpanel.open() : this.configpanel.close()));

        this.subscription = new Subscription();
        this.subscription = this.userService
            .getUserByUid(this.authService.getUid())
            .pipe(map((n) => n.data.role.config))
            .subscribe((response) => {
                this.menuService.setConfigObs(response);
            });

        this.subscription = new Subscription();
        this.subscription = this.menuService.getConfigObs().subscribe((response) => {
            this.menu = response;
        });

        this.menuNavigation();
    }

    menuNavigation() {
        this.menuItems = this.items[0].children.filter((childrenItem) => this.menu.map((menuItem) => menuItem.name).includes(childrenItem.name.toLowerCase()));

        this.newItems = this.items;
        this.newItems[0].children = this.menuItems;

        this.navigationService.items = this.newItems;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
