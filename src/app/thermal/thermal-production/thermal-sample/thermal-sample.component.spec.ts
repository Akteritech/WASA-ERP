import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermalSampleComponent } from './thermal-sample.component';

describe('ThermalSampleComponent', () => {
  let component: ThermalSampleComponent;
  let fixture: ComponentFixture<ThermalSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermalSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermalSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
