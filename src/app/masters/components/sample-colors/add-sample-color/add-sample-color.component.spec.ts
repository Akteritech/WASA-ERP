import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSampleColorComponent } from './add-sample-color.component';

describe('AddSampleColorComponent', () => {
  let component: AddSampleColorComponent;
  let fixture: ComponentFixture<AddSampleColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSampleColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSampleColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
