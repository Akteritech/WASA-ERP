import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOffsetComponent } from './plan-offset.component';

describe('PlanOffsetComponent', () => {
  let component: PlanOffsetComponent;
  let fixture: ComponentFixture<PlanOffsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOffsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
