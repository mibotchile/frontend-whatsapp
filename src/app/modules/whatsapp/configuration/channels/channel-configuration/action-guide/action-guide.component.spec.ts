import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionGuideComponent } from './action-guide.component';

describe('ActionGuideComponent', () => {
  let component: ActionGuideComponent;
  let fixture: ComponentFixture<ActionGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
