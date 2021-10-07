import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanScanJobCardComponent } from './plan-scan-job-card.component';

describe('PlanScanJobCardComponent', () => {
  let component: PlanScanJobCardComponent;
  let fixture: ComponentFixture<PlanScanJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanScanJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanScanJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
