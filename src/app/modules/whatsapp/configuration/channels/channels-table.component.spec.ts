import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsTableComponent } from './channels-table.component';

describe('ChannelsTableComponent', () => {
  let component: ChannelsTableComponent;
  let fixture: ComponentFixture<ChannelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
