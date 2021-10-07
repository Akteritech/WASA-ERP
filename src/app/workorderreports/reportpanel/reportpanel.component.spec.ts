import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpanelComponent } from './reportpanel.component';

describe('ReportpanelComponent', () => {
  let component: ReportpanelComponent;
  let fixture: ComponentFixture<ReportpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
