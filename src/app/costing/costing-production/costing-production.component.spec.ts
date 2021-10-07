import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingProductionComponent } from './costing-production.component';

describe('CostingProductionComponent', () => {
  let component: CostingProductionComponent;
  let fixture: ComponentFixture<CostingProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostingProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostingProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
