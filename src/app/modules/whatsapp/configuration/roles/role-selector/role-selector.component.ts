import { Component, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Selector, Tab } from "./selector";

@Component({
  selector: "frontend-whatsapp-role-selector",
  templateUrl: "./role-selector.component.html",
  styleUrls: ["./role-selector.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: RoleSelectorComponent
    }
  ]
})
export class RoleSelectorComponent implements OnInit, ControlValueAccessor {
  toggle = {};
  permissionsToSend: Selector[];
  tabsToSend: Tab[];

  @Input()
  data: Selector[];


  selectedData: Selector[];

  onChange = (permissionsToSend) => {};

  constructor() {
    this.permissionsToSend = [];
    this.tabsToSend = [];
  }
  writeValue(data: Selector[]): void {
    this.selectedData = data;
    if (this.selectedData) {
        this.permissionsToSend = [...this.selectedData];
        // this.selectedData.forEach(e => {
        //     this.selectedTabsHandled(e.tabs,e);
        // })
    }
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(fn: any): void {
    //throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error("Method not implemented.");
  }

  ngOnInit(): void {

  }

  selectedTabsHandled(tabs: Tab[], item) {
    this.tabsToSend = [...tabs];

    let object = {...item};

    object.tabs = tabs;

    let toFind = this.permissionsToSend.filter((n) => n.name === object.name);

    if (toFind.length === 1) {
      this.permissionsToSend[this.permissionsToSend.indexOf(toFind[0])].tabs = tabs;
    }else{
      this.permissionsToSend.push(object);
    }

    this.onChange(this.permissionsToSend);
  }

  selectedPermissionsHandle(permissions: string[], item) {

    let object = {...item};

    object.permissions = permissions;

    let toFind = this.permissionsToSend.filter((n) => n.name === object.name);

    if (toFind.length === 1) {
      this.permissionsToSend[this.permissionsToSend.indexOf(toFind[0])].permissions = permissions;
    }else{
      this.permissionsToSend.push(object);
    }
    this.onChange(this.permissionsToSend);
  }
}
