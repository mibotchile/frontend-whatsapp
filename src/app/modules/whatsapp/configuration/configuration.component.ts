import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/services/progress.service';
import menu from '../../../../static-data/menu.json';

@Component({
  selector: 'frontend-whatsapp-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  menu:any = menu;

  constructor(public progressService: ProgressService) { 
  }

  ngOnInit(): void {
    
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
