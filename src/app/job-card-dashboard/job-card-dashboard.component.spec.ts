import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardDashboardComponent } from './job-card-dashboard.component';

describe('JobCardDashboardComponent', () => {
  let component: JobCardDashboardComponent;
  let fixture: ComponentFixture<JobCardDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCardDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
