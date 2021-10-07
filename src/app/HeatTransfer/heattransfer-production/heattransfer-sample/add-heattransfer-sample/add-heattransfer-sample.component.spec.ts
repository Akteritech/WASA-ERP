import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeattransferSampleComponent } from './add-heattransfer-sample.component';

describe('AddHeattransferSampleComponent', () => {
  let component: AddHeattransferSampleComponent;
  let fixture: ComponentFixture<AddHeattransferSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHeattransferSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeattransferSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
