import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicationEnglishComponent } from './leave-application-english.component';

describe('LeaveApplicationEnglishComponent', () => {
  let component: LeaveApplicationEnglishComponent;
  let fixture: ComponentFixture<LeaveApplicationEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApplicationEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplicationEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
