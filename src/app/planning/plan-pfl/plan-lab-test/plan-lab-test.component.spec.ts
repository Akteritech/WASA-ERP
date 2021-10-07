import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanLabTestComponent } from './plan-lab-test.component';

describe('PlanLabTestComponent', () => {
  let component: PlanLabTestComponent;
  let fixture: ComponentFixture<PlanLabTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanLabTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanLabTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
