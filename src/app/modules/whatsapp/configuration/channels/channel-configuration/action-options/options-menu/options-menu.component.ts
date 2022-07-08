import { Component, OnInit } from '@angular/core';
import { Menu, Option } from 'src/app/modules/whatsapp/interfaces/channel-configuration.interface';

@Component({
  selector: 'frontend-whatsapp-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit {

  toggle: boolean;
  status: boolean;
  optionStatus: boolean[];
  redirectionStatus: boolean;
  menuStatus: boolean;
  title: string;

  menu: Menu;
  options: Option[];

  constructor() { 
    this.menu = {
      id: 0,
      title: 'Menu Principal',
      options: [
        {
          id: 0,
          value: 'Opcion 1',
          action: 'opcion.1'
        },
        {
          id: 1,
          value: 'Opcion 2',
          action: 'opcion.2'
        }
      ]
    }

    this.title = this.menu.title;
    this.options = this.menu.options;
    this.optionStatus = [];
    this.menuStatus = false;
    this.redirectionStatus = false;
  }

  ngOnInit(): void {
    this.optionStatus = this.options.map(x=>false);
  }

  addOption(id: number){
    this.options.splice(id+1,0,{
      id: 0,
      action: 'action',
      value: 'Opción'
    });

    this.options.forEach((e,i)=>{
      e.id = i;
    });
    console.log(this.options)
  }

  updateOption(id: number){
    this.optionStatus[id] = true;
  }

  deleteOption(id: number){
    this.options.splice(id,1);

    this.options.forEach((e,i)=>{
      e.id = i;
    });
    console.log(this.options)
  }

  openRedirection(id: number){
    this.redirectionStatus = true;
  }

  openMenu(id: number){
    this.menuStatus = true;
  }

  getMenuTitle(title: string){
    console.log(title)
  }

}
