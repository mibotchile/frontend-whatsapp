import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWordComponent } from './create-update-word.component';

describe('CreateUpdateWordComponent', () => {
  let component: CreateUpdateWordComponent;
  let fixture: ComponentFixture<CreateUpdateWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
