import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSamplePartWiseComponent } from './add-sample-part-wise.component';

describe('AddSamplePartWiseComponent', () => {
  let component: AddSamplePartWiseComponent;
  let fixture: ComponentFixture<AddSamplePartWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSamplePartWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSamplePartWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
