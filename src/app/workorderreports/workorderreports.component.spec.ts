import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderreportsComponent } from './workorderreports.component';

describe('WorkorderreportsComponent', () => {
  let component: WorkorderreportsComponent;
  let fixture: ComponentFixture<WorkorderreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
