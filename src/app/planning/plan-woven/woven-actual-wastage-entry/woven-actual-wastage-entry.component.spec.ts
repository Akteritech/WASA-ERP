import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WovenActualWastageEntryComponent } from './woven-actual-wastage-entry.component';

describe('WovenActualWastageEntryComponent', () => {
  let component: WovenActualWastageEntryComponent;
  let fixture: ComponentFixture<WovenActualWastageEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WovenActualWastageEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WovenActualWastageEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
