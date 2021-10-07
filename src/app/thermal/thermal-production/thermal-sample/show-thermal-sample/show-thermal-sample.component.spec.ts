import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowThermalSampleComponent } from './show-thermal-sample.component';

describe('ShowThermalSampleComponent', () => {
  let component: ShowThermalSampleComponent;
  let fixture: ComponentFixture<ShowThermalSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowThermalSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowThermalSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
