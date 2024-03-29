import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobCardComponent } from './add-job-card.component';

describe('AddThermalJobCardComponent', () => {
  let component: AddJobCardComponent;
  let fixture: ComponentFixture<AddJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
