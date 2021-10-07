import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeeProfileComponent } from './show-employee-profile.component';

describe('ShowEmployeeProfileComponent', () => {
  let component: ShowEmployeeProfileComponent;
  let fixture: ComponentFixture<ShowEmployeeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmployeeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
