import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleColorsComponent } from './sample-colors.component';

describe('SampleColorsComponent', () => {
  let component: SampleColorsComponent;
  let fixture: ComponentFixture<SampleColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
