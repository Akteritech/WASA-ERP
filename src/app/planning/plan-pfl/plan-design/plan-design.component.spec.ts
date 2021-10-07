import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDesignComponent } from './plan-design.component';

describe('PlanDesignComponent', () => {
  let component: PlanDesignComponent;
  let fixture: ComponentFixture<PlanDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
