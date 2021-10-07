import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSubCategoryComponent } from './add-product-sub-category.component';

describe('AddProductSubCategoryComponent', () => {
  let component: AddProductSubCategoryComponent;
  let fixture: ComponentFixture<AddProductSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
