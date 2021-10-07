import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderconfirmationComponent } from './workorderconfirmation.component';

describe('WorkorderconfirmationComponent', () => {
  let component: WorkorderconfirmationComponent;
  let fixture: ComponentFixture<WorkorderconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
