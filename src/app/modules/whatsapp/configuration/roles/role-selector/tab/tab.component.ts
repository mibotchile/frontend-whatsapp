import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from '../selector';

@Component({
  selector: 'frontend-whatsapp-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input()
  data: Tab[];

  @Input()
  selectedData;

  @Output()
  selectedTabs= new EventEmitter<Tab[]>();

  tabsToSend: Tab[];

  toggle = {};

  constructor() { 
    this.tabsToSend = [];
  }

  ngOnInit(): void {
  }

  onSelect(){
    this.selectedTabs.emit(this.tabsToSend);
  }

  selectedPermissionsHandle(permissions: string[], item){

    let object = {...item};
    
    let toFind = this.tabsToSend.filter(n=>n.name === item.name);

    if (toFind.length === 1) {
      this.tabsToSend[this.tabsToSend.indexOf(toFind[0])].permissions = permissions;
    }else{
      object.permissions = permissions;
      this.tabsToSend.push(object);
    }

  }

}
