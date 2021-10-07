import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleForAllCategoryComponent } from './sample-for-all-category.component';

describe('SampleForAllCategoryComponent', () => {
  let component: SampleForAllCategoryComponent;
  let fixture: ComponentFixture<SampleForAllCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleForAllCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleForAllCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
