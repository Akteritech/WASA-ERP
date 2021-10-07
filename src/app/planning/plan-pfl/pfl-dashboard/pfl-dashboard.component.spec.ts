import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflDashboardComponent } from './pfl-dashboard.component';

describe('PflDashboardComponent', () => {
  let component: PflDashboardComponent;
  let fixture: ComponentFixture<PflDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
