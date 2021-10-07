import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmasterpriceComponent } from './reportmasterprice.component';

describe('ReportmasterpriceComponent', () => {
  let component: ReportmasterpriceComponent;
  let fixture: ComponentFixture<ReportmasterpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportmasterpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmasterpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
