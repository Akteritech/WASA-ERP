import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLovComponent } from './add-lov.component';

describe('AddLovComponent', () => {
  let component: AddLovComponent;
  let fixture: ComponentFixture<AddLovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
