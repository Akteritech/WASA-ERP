import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflTechnicalDetailsComponent } from './pfl-technical-details.component';

describe('ScreenPrintTechnicalDetailsComponent', () => {
  let component: PflTechnicalDetailsComponent;
  let fixture: ComponentFixture<PflTechnicalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflTechnicalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflTechnicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
