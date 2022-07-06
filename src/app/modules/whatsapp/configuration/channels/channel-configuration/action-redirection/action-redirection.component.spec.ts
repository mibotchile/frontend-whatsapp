import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRedirectionComponent } from './action-redirection.component';

describe('ActionRedirectionComponent', () => {
  let component: ActionRedirectionComponent;
  let fixture: ComponentFixture<ActionRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionRedirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
