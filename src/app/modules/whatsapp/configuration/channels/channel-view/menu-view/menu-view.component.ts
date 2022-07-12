import { Component, Input, OnInit } from '@angular/core';
import { Menu, PrettyConfig } from '../pretty-config.interface';

@Component({
  selector: 'frontend-whatsapp-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss']
})
export class MenuViewComponent implements OnInit {

  @Input()
  data: Menu;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
