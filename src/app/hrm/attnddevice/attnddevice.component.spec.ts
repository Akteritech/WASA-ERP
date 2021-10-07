import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttnddeviceComponent } from './attnddevice.component';

describe('AttnddeviceComponent', () => {
  let component: AttnddeviceComponent;
  let fixture: ComponentFixture<AttnddeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttnddeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttnddeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
