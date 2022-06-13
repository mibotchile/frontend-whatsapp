import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import { ProgressService } from 'src/app/services/progress.service';
import menu from '../../../../static-data/menu.json';

@Component({
  selector: 'frontend-whatsapp-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  //menu:any = menu;
  menu:any;
  subscription: Subscription;

  constructor(public progressService: ProgressService, private menuService: MenuService) { 
  }

  ngOnInit(): void {
    this.getConfig();
    this.menu = JSON.parse(sessionStorage.getItem('config'));
  }

  getConfig(){
    this.subscription = new Subscription();
    this.subscription = this.menuService.getConfig().subscribe((response)=>{
      sessionStorage.setItem('config',JSON.stringify(response));
    });
  }


  menuVisibility(value: string){

    for (const item of this.menu) {
      console.log(item)
      for (const i of item.tabs) {
        if (i.name === value) {
          return true
        }
      }
    }
    false
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
