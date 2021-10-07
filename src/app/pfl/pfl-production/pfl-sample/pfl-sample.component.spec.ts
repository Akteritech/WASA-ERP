import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflSampleComponent } from './pfl-sample.component';

describe('PflSampleComponent', () => {
  let component: PflSampleComponent;
  let fixture: ComponentFixture<PflSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
