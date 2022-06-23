import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsMenuItemComponent } from './options-menu-item.component';

describe('OptionsMenuItemComponent', () => {
  let component: OptionsMenuItemComponent;
  let fixture: ComponentFixture<OptionsMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
