import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import whatsapp from '@iconify/icons-logos/whatsapp';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import menu from '../static-data/menu.json';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vex';

  menuItems: any = {};
  menuItemsAux: any = {};
  menu: any = menu;

  items: any =  [
    {
      type: 'dropdown',
      label: 'Whatsapp',
      //route: '/',
      icon: whatsapp,
      //routerLinkActiveOptions: { exact: true },
      children: [
        {
          type: 'link',
          label: 'Conversaciones',
          route: '/apps/chat'
        },
        {
          type: 'link',
          label: 'Configuracion',
          route: '/whatsapp/configuration'
        },
      ]
    },
  ];

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    showConfigButton: false,
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

     this.configService.updateConfig({
      sidenav: {
        title: 'WhatsApp',
        imageUrl: './../assets/img/logo.svg',
        showCollapsePin: true
      },
      footer: {
        visible: false
      }
    });

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));

    this.menuNavigation();
  }

  menuNavigation() {
    
    //this.menuItemsAux = this.items[0].children.map((item)=>item.label.toLowerCase());
    this.menuItemsAux = this.menu.map((menuItem)=>menuItem.name);
    this.menuItems = this.items.filter((item) => item.children.map((i)=>i.label.toLowerCase()).filter((j)=>this.menuItemsAux.includes(j)));
    
    console.log(this.menuItemsAux)
    console.log(this.menuItems)

    this.navigationService.items = this.menuItems;
  }
}
