import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreenPrintTechnicalDetailsComponent } from './add-screen-print-technical-details.component';

describe('AddScreenPrintTechnicalDetailsComponent', () => {
  let component: AddScreenPrintTechnicalDetailsComponent;
  let fixture: ComponentFixture<AddScreenPrintTechnicalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScreenPrintTechnicalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScreenPrintTechnicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
