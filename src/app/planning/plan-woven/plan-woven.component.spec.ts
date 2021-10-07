import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanWovenComponent } from './plan-woven.component';

describe('PlanWovenComponent', () => {
  let component: PlanWovenComponent;
  let fixture: ComponentFixture<PlanWovenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanWovenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanWovenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
