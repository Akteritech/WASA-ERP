import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflProductionDashboardComponent } from './pfl-production-dashboard.component';

describe('PflProductionDashboardComponent', () => {
  let component: PflProductionDashboardComponent;
  let fixture: ComponentFixture<PflProductionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflProductionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflProductionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
