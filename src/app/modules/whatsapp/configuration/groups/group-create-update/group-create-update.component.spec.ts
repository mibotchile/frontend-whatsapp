import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreateUpdateComponent } from './group-create-update.component';

describe('GroupCreateUpdateComponent', () => {
  let component: GroupCreateUpdateComponent;
  let fixture: ComponentFixture<GroupCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
