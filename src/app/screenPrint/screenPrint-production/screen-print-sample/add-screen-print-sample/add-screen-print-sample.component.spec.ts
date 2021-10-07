import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreenPrintSampleComponent } from './add-screen-print-sample.component';

describe('AddScreenPrintSampleComponent', () => {
  let component: AddScreenPrintSampleComponent;
  let fixture: ComponentFixture<AddScreenPrintSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScreenPrintSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScreenPrintSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
