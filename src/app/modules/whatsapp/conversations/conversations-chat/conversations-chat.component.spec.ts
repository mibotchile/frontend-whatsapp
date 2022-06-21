import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsChatComponent } from './conversations-chat.component';

describe('ConversationsChatComponent', () => {
  let component: ConversationsChatComponent;
  let fixture: ComponentFixture<ConversationsChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationsChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
