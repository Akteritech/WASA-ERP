import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflProductionComponent } from './pfl-production.component';

describe('ScreenPrintProductionComponent', () => {
  let component: PflProductionComponent;
  let fixture: ComponentFixture<PflProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
