import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPrintTechnicalDetailsComponent } from './screenPrint-technical-details.component';

describe('ScreenPrintTechnicalDetailsComponent', () => {
  let component: ScreenPrintTechnicalDetailsComponent;
  let fixture: ComponentFixture<ScreenPrintTechnicalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenPrintTechnicalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPrintTechnicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
