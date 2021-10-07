import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingSummaryComponent } from './outstanding-summary.component';

describe('OutstandingSummaryComponent', () => {
  let component: OutstandingSummaryComponent;
  let fixture: ComponentFixture<OutstandingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
