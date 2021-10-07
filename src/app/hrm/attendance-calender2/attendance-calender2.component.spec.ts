import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCalender2Component } from './attendance-calender2.component';

describe('AttendanceCalender2Component', () => {
  let component: AttendanceCalender2Component;
  let fixture: ComponentFixture<AttendanceCalender2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceCalender2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCalender2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
