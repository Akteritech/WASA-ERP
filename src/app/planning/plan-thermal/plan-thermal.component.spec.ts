import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanThermalComponent } from './plan-thermal.component';

describe('PlanThermalComponent', () => {
  let component: PlanThermalComponent;
  let fixture: ComponentFixture<PlanThermalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanThermalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanThermalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
