import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAttentionComponent } from './action-attention.component';

describe('ActionAttentionComponent', () => {
  let component: ActionAttentionComponent;
  let fixture: ComponentFixture<ActionAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
