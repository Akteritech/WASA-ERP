import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterchallanComponent } from './add-masterchallan.component';

describe('AddMasterchallanComponent', () => {
  let component: AddMasterchallanComponent;
  let fixture: ComponentFixture<AddMasterchallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMasterchallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterchallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
