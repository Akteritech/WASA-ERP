import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterchallanComponent } from './masterchallan.component';

describe('MasterchallanComponent', () => {
  let component: MasterchallanComponent;
  let fixture: ComponentFixture<MasterchallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterchallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterchallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
