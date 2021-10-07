import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerorderreportComponent } from './buyerorderreport.component';

describe('BuyerorderreportComponent', () => {
  let component: BuyerorderreportComponent;
  let fixture: ComponentFixture<BuyerorderreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerorderreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerorderreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
