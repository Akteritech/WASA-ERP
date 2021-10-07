import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflCuttingUpdateComponent } from './pfl-cutting-update.component';

describe('PflCuttingUpdateComponent', () => {
  let component: PflCuttingUpdateComponent;
  let fixture: ComponentFixture<PflCuttingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflCuttingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflCuttingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
