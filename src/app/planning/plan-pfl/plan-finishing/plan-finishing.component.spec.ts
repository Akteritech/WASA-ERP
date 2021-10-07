import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFinishingComponent } from './plan-finishing.component';

describe('PlanFinishingComponent', () => {
  let component: PlanFinishingComponent;
  let fixture: ComponentFixture<PlanFinishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanFinishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanFinishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
