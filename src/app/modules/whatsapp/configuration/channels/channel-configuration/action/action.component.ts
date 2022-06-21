import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-whatsapp-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input()
  label : string;

  constructor() { }

  ngOnInit(): void {
  }

}
