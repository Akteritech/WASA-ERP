import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleaveapplicationComponent } from './addleaveapplication.component';

describe('AddleaveapplicationComponent', () => {
  let component: AddleaveapplicationComponent;
  let fixture: ComponentFixture<AddleaveapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddleaveapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleaveapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
