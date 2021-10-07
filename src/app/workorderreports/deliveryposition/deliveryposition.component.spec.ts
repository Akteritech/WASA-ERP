import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypositionComponent } from './deliveryposition.component';

describe('DeliverypositionComponent', () => {
  let component: DeliverypositionComponent;
  let fixture: ComponentFixture<DeliverypositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverypositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverypositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
