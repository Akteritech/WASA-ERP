import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterPriceEntryComponent } from './add-master-price-entry.component';

describe('AddMasterPriceEntryComponent', () => {
  let component: AddMasterPriceEntryComponent;
  let fixture: ComponentFixture<AddMasterPriceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMasterPriceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterPriceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
