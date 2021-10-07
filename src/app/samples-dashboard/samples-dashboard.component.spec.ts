import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesDashboardComponent } from './samples-dashboard.component';

describe('SamplesDashboardComponent', () => {
  let component: SamplesDashboardComponent;
  let fixture: ComponentFixture<SamplesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
