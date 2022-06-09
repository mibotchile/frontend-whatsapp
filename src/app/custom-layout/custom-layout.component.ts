import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../@vex/services/layout.service';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { checkRouterChildsData } from '../../@vex/utils/check-router-childs-data';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConfigService } from '../../@vex/services/config.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarComponent } from '../../@vex/components/sidebar/sidebar.component';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { UserService } from '../modules/whatsapp/services/user.service';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../modules/whatsapp/services/role.service';


@UntilDestroy()
@Component({
  selector: 'vex-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent implements OnInit {

  subscription: Subscription;

  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  isDesktop$ = this.layoutService.isDesktop$;

  toolbarShadowEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.toolbarShadowEnabled))
  );

  @ViewChild('configpanel', { static: true }) configpanel: SidebarComponent;

  constructor(private layoutService: LayoutService,
              private configService: ConfigService,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              private userService: UserService,
              private roleService: RoleService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadConfigByUid(this.authService.getUid())
    this.layoutService.configpanelOpen$.pipe(
      untilDestroyed(this)
    ).subscribe(open => open ? this.configpanel.open() : this.configpanel.close());

  }

  getUsersWithRoles(): Observable<any>{
    let users$ = this.userService.getUsers();
    let roles$ = this.roleService.getRoles();

    return forkJoin([users$,roles$]);
  }

  loadConfigByUid(uid: string){
    this.subscription = new Subscription();
    this.subscription = this.getUsersWithRoles().subscribe((response: any)=>{
      const user = response[0].data.filter((n)=>n.uid === uid)[0];
      const role = response[1].data.filter(n=>n.id === user.role_id)[0];
      console.log(role.config);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
