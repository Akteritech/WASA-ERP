import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOffsetSampleComponent } from './show-offset-sample.component';

describe('ShowHeattransferSampleComponent', () => {
  let component: ShowOffsetSampleComponent;
  let fixture: ComponentFixture<ShowOffsetSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOffsetSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOffsetSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
