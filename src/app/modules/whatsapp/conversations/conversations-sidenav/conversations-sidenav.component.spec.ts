import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsSidenavComponent } from './conversations-sidenav.component';

describe('ConversationsSidenavComponent', () => {
  let component: ConversationsSidenavComponent;
  let fixture: ComponentFixture<ConversationsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationsSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
