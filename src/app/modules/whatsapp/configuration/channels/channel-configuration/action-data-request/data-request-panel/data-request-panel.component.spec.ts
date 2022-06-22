import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRequestPanelComponent } from './data-request-panel.component';

describe('DataRequestPanelComponent', () => {
  let component: DataRequestPanelComponent;
  let fixture: ComponentFixture<DataRequestPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRequestPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRequestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
