import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-whatsapp-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent implements OnInit {

  isExpanded: boolean;

  constructor() {
    this.isExpanded = false;
   }

  ngOnInit(): void {
  }

  actionList() {
    this.isExpanded = !this.isExpanded;
  }

}
