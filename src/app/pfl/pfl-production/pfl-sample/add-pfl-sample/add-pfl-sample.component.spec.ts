import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPflSampleComponent } from './add-pfl-sample.component';

describe('AddPflSampleComponent', () => {
  let component: AddPflSampleComponent;
  let fixture: ComponentFixture<AddPflSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPflSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPflSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
