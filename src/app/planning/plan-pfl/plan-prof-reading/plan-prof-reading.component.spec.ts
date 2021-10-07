import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanProfReadingComponent } from './plan-prof-reading.component';

describe('PlanProfReadingComponent', () => {
  let component: PlanProfReadingComponent;
  let fixture: ComponentFixture<PlanProfReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanProfReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanProfReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
