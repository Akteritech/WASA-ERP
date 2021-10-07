import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerPayslipComponent } from './worker-payslip.component';

describe('WorkerPayslipComponent', () => {
  let component: WorkerPayslipComponent;
  let fixture: ComponentFixture<WorkerPayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerPayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
