import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPflSampleComponent } from './show-pfl-sample.component';

describe('ShowPflSampleComponent', () => {
  let component: ShowPflSampleComponent;
  let fixture: ComponentFixture<ShowPflSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPflSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPflSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
