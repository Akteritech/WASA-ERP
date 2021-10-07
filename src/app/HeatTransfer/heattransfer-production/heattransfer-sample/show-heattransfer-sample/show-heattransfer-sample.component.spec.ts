import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHeattransferSampleComponent } from './show-heattransfer-sample.component';

describe('ShowHeattransferSampleComponent', () => {
  let component: ShowHeattransferSampleComponent;
  let fixture: ComponentFixture<ShowHeattransferSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHeattransferSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHeattransferSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
