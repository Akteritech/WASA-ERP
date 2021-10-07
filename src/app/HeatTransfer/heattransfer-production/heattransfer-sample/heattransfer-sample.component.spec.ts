import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeattransferSampleComponent } from './heattransfer-sample.component';

describe('HeattransferSampleComponent', () => {
  let component: HeattransferSampleComponent;
  let fixture: ComponentFixture<HeattransferSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeattransferSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeattransferSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
