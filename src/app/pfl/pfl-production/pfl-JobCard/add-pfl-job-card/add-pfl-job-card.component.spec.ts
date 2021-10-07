import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPflJobCardComponent } from './add-pfl-job-card.component';

describe('AddThermalJobCardComponent', () => {
  let component: AddPflJobCardComponent;
  let fixture: ComponentFixture<AddPflJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPflJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPflJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
