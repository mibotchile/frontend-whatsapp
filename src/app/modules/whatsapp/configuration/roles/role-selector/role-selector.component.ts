import { Component, Input, OnInit } from "@angular/core";
import { Selector, Tab } from "./selector";

@Component({
  selector: "frontend-whatsapp-role-selector",
  templateUrl: "./role-selector.component.html",
  styleUrls: ["./role-selector.component.scss"],
})
export class RoleSelectorComponent implements OnInit {
  toggle = {};
  permissionsToSend: Selector[];
  tabsToSend: Tab[];

  @Input()
  data: Selector[];

  constructor() {
    this.permissionsToSend = [];
    this.tabsToSend = [];
  }

  ngOnInit(): void {}

  selectedPermissionsHandle(permissions, item) {
    let objectToSend = {
      name: item.name,
      tabs: item.tabs,
      hasTabs: item.hasTabs,
      childrens: item.childrens,
      permissions: permissions,
      hasChildrens: item.hasChildrens,
      hasPermissions: item.hasPermissions,
    };

    let tabToSend = {
      name: item.name,
      permissions: permissions,
      hasPermissions: item.hasPermissions,
    };

    if (
      item.tabs === undefined &&
      item.hasTabs === undefined &&
      item.hasChildrens === undefined
    ) {
      let toSend = this.tabsToSend.filter((n) => n.name === item.name);
      let index = this.tabsToSend.indexOf(toSend[0]);

      if (toSend.length === 1) {
        this.tabsToSend[index].permissions = permissions;
      } else {
        this.tabsToSend.push(tabToSend);
      }
    } else {
      let toSend = this.permissionsToSend.filter((n) => n.name === item.name);
      let index = this.permissionsToSend.indexOf(toSend[0]);

      if (toSend.length === 1) {
        this.permissionsToSend[index].permissions = permissions;
        
      } else {
        this.permissionsToSend.push(objectToSend);
      }
    }

    console.log(this.permissionsToSend);
    console.log(this.tabsToSend)
  }
}
