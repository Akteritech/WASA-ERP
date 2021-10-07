import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffsetSampleComponent } from './add-offset-sample.component';

describe('AddHeattransferSampleComponent', () => {
  let component: AddOffsetSampleComponent;
  let fixture: ComponentFixture<AddOffsetSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOffsetSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOffsetSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
