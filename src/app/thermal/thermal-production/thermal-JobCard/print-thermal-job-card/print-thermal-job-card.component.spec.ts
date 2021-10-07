import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintThermalJobCardComponent } from './print-thermal-job-card.component';

describe('PrintThermalJobCardComponent', () => {
  let component: PrintThermalJobCardComponent;
  let fixture: ComponentFixture<PrintThermalJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintThermalJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintThermalJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
