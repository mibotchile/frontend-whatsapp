import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedWordsComponent } from './banned-words.component';

describe('BannedWordsComponent', () => {
  let component: BannedWordsComponent;
  let fixture: ComponentFixture<BannedWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
