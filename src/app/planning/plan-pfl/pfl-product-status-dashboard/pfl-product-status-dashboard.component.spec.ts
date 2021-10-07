import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflProductStatusDashboardComponent } from './pfl-product-status-dashboard.component';

describe('PflProductStatusDashboardComponent', () => {
  let component: PflProductStatusDashboardComponent;
  let fixture: ComponentFixture<PflProductStatusDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflProductStatusDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflProductStatusDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
