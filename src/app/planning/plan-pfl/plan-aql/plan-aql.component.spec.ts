import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAqlComponent } from './plan-aql.component';

describe('PlanAqlComponent', () => {
  let component: PlanAqlComponent;
  let fixture: ComponentFixture<PlanAqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
