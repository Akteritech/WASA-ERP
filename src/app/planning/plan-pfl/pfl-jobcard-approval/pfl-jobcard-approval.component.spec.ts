import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflJobcardApprovalComponent } from './pfl-jobcard-approval.component';

describe('PflJobcardApprovalComponent', () => {
  let component: PflJobcardApprovalComponent;
  let fixture: ComponentFixture<PflJobcardApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflJobcardApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflJobcardApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
