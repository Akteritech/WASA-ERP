import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSampleForAllCategoryComponent } from './add-sample-for-all-category.component';

describe('AddSampleForAllCategoryComponent', () => {
  let component: AddSampleForAllCategoryComponent;
  let fixture: ComponentFixture<AddSampleForAllCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSampleForAllCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSampleForAllCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
