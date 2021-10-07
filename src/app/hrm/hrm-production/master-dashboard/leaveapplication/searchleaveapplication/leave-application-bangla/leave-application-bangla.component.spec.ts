import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicationBanglaComponent } from './leave-application-bangla.component';

describe('LeaveApplicationBanglaComponent', () => {
  let component: LeaveApplicationBanglaComponent;
  let fixture: ComponentFixture<LeaveApplicationBanglaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApplicationBanglaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplicationBanglaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
