import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialDetailComponent } from './add-material-detail.component';

describe('AddMaterialDetailComponent', () => {
  let component: AddMaterialDetailComponent;
  let fixture: ComponentFixture<AddMaterialDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaterialDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
