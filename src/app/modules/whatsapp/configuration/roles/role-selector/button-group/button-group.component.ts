import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-whatsapp-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  @Input()
  permissions;

  toggle = [];

  constructor() {
    this.toggle = [false,false,false,false];
   }

  ngOnInit(): void {
  }

  test(){
    console.log(this.toggle)
    
  }

}
