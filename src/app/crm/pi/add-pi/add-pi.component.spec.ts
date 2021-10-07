import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPiComponent } from './add-pi.component';

describe('AddPiComponent', () => {
  let component: AddPiComponent;
  let fixture: ComponentFixture<AddPiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
