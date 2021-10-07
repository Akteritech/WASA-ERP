import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanTrackingComponent } from './challan-tracking.component';

describe('ChallanTrackingComponent', () => {
  let component: ChallanTrackingComponent;
  let fixture: ComponentFixture<ChallanTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
