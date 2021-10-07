import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerPayslipComponent } from './officer-payslip.component';

describe('OfficerPayslipComponent', () => {
  let component: OfficerPayslipComponent;
  let fixture: ComponentFixture<OfficerPayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerPayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
