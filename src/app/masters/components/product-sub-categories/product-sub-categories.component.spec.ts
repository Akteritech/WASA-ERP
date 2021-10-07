import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubCategoriesComponent } from './product-sub-categories.component';

describe('ProductSubCategoriesComponent', () => {
  let component: ProductSubCategoriesComponent;
  let fixture: ComponentFixture<ProductSubCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
