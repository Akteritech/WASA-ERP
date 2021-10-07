import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceJobcardComponent } from './attendance-jobcard.component';

describe('AttendanceJobcardComponent', () => {
  let component: AttendanceJobcardComponent;
  let fixture: ComponentFixture<AttendanceJobcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceJobcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceJobcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
