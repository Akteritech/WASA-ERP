import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPlanningComponent } from './plan-planning.component';

describe('PlanPlanningComponent', () => {
  let component: PlanPlanningComponent;
  let fixture: ComponentFixture<PlanPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
