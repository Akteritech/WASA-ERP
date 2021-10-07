import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPrintSampleComponent } from './screen-print-sample.component';

describe('ScreenPrintSampleComponent', () => {
  let component: ScreenPrintSampleComponent;
  let fixture: ComponentFixture<ScreenPrintSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenPrintSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPrintSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
