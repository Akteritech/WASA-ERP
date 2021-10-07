import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeattransferComponent } from './heattransfer.component';

describe('HeattransferComponent', () => {
  let component: HeattransferComponent;
  let fixture: ComponentFixture<HeattransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeattransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeattransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
