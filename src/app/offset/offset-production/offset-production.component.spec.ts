import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetProductionComponent } from './offset-production.component';

describe('HeattransferProductionComponent', () => {
  let component: OffsetProductionComponent;
  let fixture: ComponentFixture<OffsetProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffsetProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffsetProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
