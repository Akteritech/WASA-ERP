import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePhotoGalleryComponent } from './employee-photo-gallery.component';

describe('EmployeePhotoGalleryComponent', () => {
  let component: EmployeePhotoGalleryComponent;
  let fixture: ComponentFixture<EmployeePhotoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePhotoGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
