import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryComponentComponent } from './salary-component.component';

describe('SalaryComponentComponent', () => {
  let component: SalaryComponentComponent;
  let fixture: ComponentFixture<SalaryComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
