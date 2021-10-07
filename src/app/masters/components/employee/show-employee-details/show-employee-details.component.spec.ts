import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeeDetailsComponent } from './show-employee-details.component';

describe('ShowEmployeeDetailsComponent', () => {
  let component: ShowEmployeeDetailsComponent;
  let fixture: ComponentFixture<ShowEmployeeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmployeeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
