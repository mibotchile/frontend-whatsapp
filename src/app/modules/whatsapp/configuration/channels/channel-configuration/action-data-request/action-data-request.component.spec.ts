import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDataRequestComponent } from './action-data-request.component';

describe('ActionDataRequestComponent', () => {
  let component: ActionDataRequestComponent;
  let fixture: ComponentFixture<ActionDataRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionDataRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDataRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
