import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeliveryChallanComponent } from './show-delivery-challan.component';

describe('ShowDeliveryChallanComponent', () => {
  let component: ShowDeliveryChallanComponent;
  let fixture: ComponentFixture<ShowDeliveryChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDeliveryChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeliveryChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
