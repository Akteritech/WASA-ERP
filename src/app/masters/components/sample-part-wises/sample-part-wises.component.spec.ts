import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePartWisesComponent } from './sample-part-wises.component';

describe('SamplePartWisesComponent', () => {
  let component: SamplePartWisesComponent;
  let fixture: ComponentFixture<SamplePartWisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePartWisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePartWisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
