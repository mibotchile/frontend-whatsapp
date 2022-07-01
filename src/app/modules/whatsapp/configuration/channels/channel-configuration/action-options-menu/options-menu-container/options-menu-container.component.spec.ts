import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsMenuContainerComponent } from './options-menu-container.component';

describe('OptionsMenuContainerComponent', () => {
  let component: OptionsMenuContainerComponent;
  let fixture: ComponentFixture<OptionsMenuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsMenuContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsMenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
