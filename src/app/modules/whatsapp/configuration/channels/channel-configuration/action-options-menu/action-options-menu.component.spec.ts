import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionOptionsMenuComponent } from './action-options-menu.component';

describe('ActionOptionsMenuComponent', () => {
  let component: ActionOptionsMenuComponent;
  let fixture: ComponentFixture<ActionOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionOptionsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
