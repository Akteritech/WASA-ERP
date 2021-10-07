import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetSampleComponent } from './offset-sample.component';

describe('HeattransferSampleComponent', () => {
  let component: OffsetSampleComponent;
  let fixture: ComponentFixture<OffsetSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffsetSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffsetSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
