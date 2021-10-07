import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCuringComponent } from './plan-curing.component';

describe('PlanCuringComponent', () => {
  let component: PlanCuringComponent;
  let fixture: ComponentFixture<PlanCuringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCuringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCuringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
