import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'frontend-whatsapp-menu-element',
  templateUrl: './menu-element.component.html',
  styleUrls: ['./menu-element.component.scss']
})
export class MenuElementComponent implements OnInit {

  @Output()
  cancelEventEmitter = new EventEmitter<void>();

  @Output()
  acceptEventEmiiter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  cancelMenu(){
    this.cancelEventEmitter.emit();
  }

  acceptMenu(title: string){
    this.acceptEventEmiiter.emit(title);
  }

}
