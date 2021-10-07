import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPrintProductionComponent } from './screenPrint-production.component';

describe('ScreenPrintProductionComponent', () => {
  let component: ScreenPrintProductionComponent;
  let fixture: ComponentFixture<ScreenPrintProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenPrintProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPrintProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
