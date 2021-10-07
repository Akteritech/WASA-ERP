import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCuttingComponent } from './plan-cutting.component';

describe('PlanCuttingComponent', () => {
  let component: PlanCuttingComponent;
  let fixture: ComponentFixture<PlanCuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCuttingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
