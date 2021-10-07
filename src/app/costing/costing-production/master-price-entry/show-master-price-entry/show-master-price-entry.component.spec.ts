import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMasterPriceEntryComponent } from './show-master-price-entry.component';

describe('ShowMasterPriceEntryComponent', () => {
  let component: ShowMasterPriceEntryComponent;
  let fixture: ComponentFixture<ShowMasterPriceEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMasterPriceEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMasterPriceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
