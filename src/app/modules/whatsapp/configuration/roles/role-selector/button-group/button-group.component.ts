import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "frontend-whatsapp-button-group",
  templateUrl: "./button-group.component.html",
  styleUrls: ["./button-group.component.scss"],
})
export class ButtonGroupComponent implements OnInit {
  @Input()
  permissions;

  @Input()
  item;

  @Input()
  selectedData;

  @Input()
  displayPermissions;

  @Output()
  selectedPermissions = new EventEmitter<[string]>();

  toggle = [];

  constructor() {
    this.toggle = [false, false, false, false];
  }

  ngOnInit(): void {

    const order = ['create', 'read', 'update', 'delete'];
    if (this.selectedData) {

      this.selectedData.forEach(element => {
        if (element.name === this.item.name) {
          this.toggle = order.map(x=>x = element.permissions.includes(x) );
        }
        if (this.item.hasTabs === undefined) {

          element.tabs.forEach(i=>{
            if (i.name === this.item.name) {
              this.toggle = order.map(x=>x = i.permissions.includes(x) );
            }
          })
        }
       
      });
    }
  }

  onSelect() {

    const selected = this.permissions.filter((x, i) => this.toggle[i] === true);

    this.selectedPermissions.emit(selected);
  }
}
