import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanChallanComponent } from './plan-challan.component';

describe('PlanChallanComponent', () => {
  let component: PlanChallanComponent;
  let fixture: ComponentFixture<PlanChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
