import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddholidaysetupComponent } from './addholidaysetup.component';

describe('AddholidaysetupComponent', () => {
  let component: AddholidaysetupComponent;
  let fixture: ComponentFixture<AddholidaysetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddholidaysetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddholidaysetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
