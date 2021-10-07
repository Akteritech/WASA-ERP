import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendsetupComponent } from './weekendsetup.component';

describe('WeekendsetupComponent', () => {
  let component: WeekendsetupComponent;
  let fixture: ComponentFixture<WeekendsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekendsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekendsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
