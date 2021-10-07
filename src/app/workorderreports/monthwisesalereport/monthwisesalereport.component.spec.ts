import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthwisesalereportComponent } from './monthwisesalereport.component';

describe('MonthwisesalereportComponent', () => {
  let component: MonthwisesalereportComponent;
  let fixture: ComponentFixture<MonthwisesalereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthwisesalereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthwisesalereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
