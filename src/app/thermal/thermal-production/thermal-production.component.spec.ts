import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermalProductionComponent } from './thermal-production.component';

describe('ThermalProductionComponent', () => {
  let component: ThermalProductionComponent;
  let fixture: ComponentFixture<ThermalProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermalProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermalProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
