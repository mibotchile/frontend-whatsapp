import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRedirectionComponent } from './menu-redirection.component';

describe('MenuRedirectionComponent', () => {
  let component: MenuRedirectionComponent;
  let fixture: ComponentFixture<MenuRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRedirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
