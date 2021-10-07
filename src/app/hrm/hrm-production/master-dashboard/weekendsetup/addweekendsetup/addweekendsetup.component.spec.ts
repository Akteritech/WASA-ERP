import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddweekendsetupComponent } from './addweekendsetup.component';

describe('AddweekendsetupComponent', () => {
  let component: AddweekendsetupComponent;
  let fixture: ComponentFixture<AddweekendsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddweekendsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddweekendsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
