import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverychartreportsComponent } from './deliverychartreports.component';

describe('DeliverychartreportsComponent', () => {
  let component: DeliverychartreportsComponent;
  let fixture: ComponentFixture<DeliverychartreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverychartreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverychartreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
