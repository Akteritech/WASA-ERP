import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderexportComponent } from './orderexport.component';

describe('OrderexportComponent', () => {
  let component: OrderexportComponent;
  let fixture: ComponentFixture<OrderexportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
