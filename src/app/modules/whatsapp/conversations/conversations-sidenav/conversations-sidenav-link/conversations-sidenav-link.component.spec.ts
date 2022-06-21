import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsSidenavLinkComponent } from './conversations-sidenav-link.component';

describe('ConversationsSidenavLinkComponent', () => {
  let component: ConversationsSidenavLinkComponent;
  let fixture: ComponentFixture<ConversationsSidenavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationsSidenavLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsSidenavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
