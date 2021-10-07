import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSampleForAllCategoryComponent } from './show-sample-for-all-category.component';

describe('ShowSampleForAllCategoryComponent', () => {
  let component: ShowSampleForAllCategoryComponent;
  let fixture: ComponentFixture<ShowSampleForAllCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSampleForAllCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSampleForAllCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
