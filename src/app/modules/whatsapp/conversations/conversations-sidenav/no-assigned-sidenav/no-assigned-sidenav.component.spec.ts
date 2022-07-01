import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAssignedSidenavComponent } from './no-assigned-sidenav.component';

describe('NoAssignedSidenavComponent', () => {
  let component: NoAssignedSidenavComponent;
  let fixture: ComponentFixture<NoAssignedSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAssignedSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAssignedSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
