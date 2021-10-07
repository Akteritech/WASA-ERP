import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanTrackingDashboardComponent } from './challan-tracking-dashboard.component';

describe('ChallanTrackingDashboardComponent', () => {
  let component: ChallanTrackingDashboardComponent;
  let fixture: ComponentFixture<ChallanTrackingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanTrackingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanTrackingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
