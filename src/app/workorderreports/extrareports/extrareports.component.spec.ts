import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrareportsComponent } from './extrareports.component';

describe('ExtrareportsComponent', () => {
  let component: ExtrareportsComponent;
  let fixture: ComponentFixture<ExtrareportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrareportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrareportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
