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
  displayPermissions;

  @Output()
  selectedPermissions = new EventEmitter<[string]>();

  toggle = [];

  constructor() {
    this.toggle = [false, false, false, false];
  }

  ngOnInit(): void {}

  onSelect() {

    const selected = this.permissions.filter((x, i) => this.toggle[i] === true);

    this.selectedPermissions.emit(selected);
  }
}
