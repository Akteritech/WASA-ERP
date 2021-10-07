import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsorderreportsComponent } from './csorderreports.component';

describe('CsorderreportsComponent', () => {
  let component: CsorderreportsComponent;
  let fixture: ComponentFixture<CsorderreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsorderreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsorderreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
