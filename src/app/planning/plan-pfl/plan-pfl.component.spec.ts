import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPflComponent } from './plan-pfl.component';

describe('PlanPflComponent', () => {
  let component: PlanPflComponent;
  let fixture: ComponentFixture<PlanPflComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPflComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
