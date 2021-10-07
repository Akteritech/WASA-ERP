import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysetupComponent } from './holidaysetup.component';

describe('HolidaysetupComponent', () => {
  let component: HolidaysetupComponent;
  let fixture: ComponentFixture<HolidaysetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
