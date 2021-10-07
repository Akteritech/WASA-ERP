import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPflJobCardComponent } from './print-pfl-job-card.component';

describe('PrintThermalJobCardComponent', () => {
  let component: PrintPflJobCardComponent;
  let fixture: ComponentFixture<PrintPflJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPflJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPflJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
