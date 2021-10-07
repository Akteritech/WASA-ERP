import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanScreenComponent } from './plan-screen.component';

describe('PlanScreenComponent', () => {
  let component: PlanScreenComponent;
  let fixture: ComponentFixture<PlanScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
