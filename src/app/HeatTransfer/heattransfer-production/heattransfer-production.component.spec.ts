import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeattransferProductionComponent } from './heattransfer-production.component';

describe('HeattransferProductionComponent', () => {
  let component: HeattransferProductionComponent;
  let fixture: ComponentFixture<HeattransferProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeattransferProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeattransferProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
