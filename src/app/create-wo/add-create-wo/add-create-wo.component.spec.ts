import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreateWoComponent } from './add-create-wo.component';

describe('AddCreateWoComponent', () => {
  let component: AddCreateWoComponent;
  let fixture: ComponentFixture<AddCreateWoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCreateWoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreateWoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
