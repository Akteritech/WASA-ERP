import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WovenProductionComponent } from './woven-production.component';

describe('WovenProductionComponent', () => {
  let component: WovenProductionComponent;
  let fixture: ComponentFixture<WovenProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WovenProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WovenProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
