import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRejoiningComponent } from './employee-rejoining.component';

describe('EmployeeRejoiningComponent', () => {
  let component: EmployeeRejoiningComponent;
  let fixture: ComponentFixture<EmployeeRejoiningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRejoiningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRejoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
