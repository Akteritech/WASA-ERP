import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingreportsComponent } from './costingreports.component';

describe('CostingreportsComponent', () => {
  let component: CostingreportsComponent;
  let fixture: ComponentFixture<CostingreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostingreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostingreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
