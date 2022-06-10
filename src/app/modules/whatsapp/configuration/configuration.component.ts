import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import { ProgressService } from 'src/app/services/progress.service';
import menu from '../../../../static-data/menu.json';

@Component({
  selector: 'frontend-whatsapp-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  //menu:any = menu;
  menu:any;

  constructor(public progressService: ProgressService) { 
  }

  ngOnInit(): void {
    this.menu = JSON.parse(localStorage.getItem('config'));
  }


  menuVisibility(value: string){

    for (const item of this.menu) {
      if (!item.hasTabs) {
        return false;
      }
      for (const tab of item.tabs) {
        if (tab.name === value) {
          return true;
        }
      }
    }
    return false;
  }

}
