import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMasterChallanComponent } from './show-master-challan.component';

describe('ShowMasterChallanComponent', () => {
  let component: ShowMasterChallanComponent;
  let fixture: ComponentFixture<ShowMasterChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMasterChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMasterChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
