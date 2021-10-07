import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReportComponent } from './crm-report.component';

describe('CrmReportComponent', () => {
  let component: CrmReportComponent;
  let fixture: ComponentFixture<CrmReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
