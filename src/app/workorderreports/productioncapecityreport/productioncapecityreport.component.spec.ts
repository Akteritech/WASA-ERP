import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductioncapecityreportComponent } from './productioncapecityreport.component';

describe('ProductioncapecityreportComponent', () => {
  let component: ProductioncapecityreportComponent;
  let fixture: ComponentFixture<ProductioncapecityreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductioncapecityreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductioncapecityreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
