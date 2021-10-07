import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflJobCardComponent } from './pfl-job-card.component';

describe('ThermalJobCardComponent', () => {
  let component: PflJobCardComponent;
  let fixture: ComponentFixture<PflJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
