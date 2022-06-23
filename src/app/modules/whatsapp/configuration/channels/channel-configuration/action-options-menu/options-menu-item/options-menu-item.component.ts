import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-whatsapp-options-menu-item',
  templateUrl: './options-menu-item.component.html',
  styleUrls: ['./options-menu-item.component.scss']
})
export class OptionsMenuItemComponent implements OnInit {

    status: boolean;
    element: string;
    toggle: boolean;

  constructor() {
    this.status = true;
    this.toggle = false;
  }

  ngOnInit(): void {
  }

  onEdit(){
    this.status = !this.status;
  }

}
