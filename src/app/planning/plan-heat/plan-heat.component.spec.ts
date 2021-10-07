import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHeatComponent } from './plan-heat.component';

describe('PlanHeatComponent', () => {
  let component: PlanHeatComponent;
  let fixture: ComponentFixture<PlanHeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanHeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanHeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
