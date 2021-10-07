import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLcComponent } from './create-lc.component';

describe('CreateLcComponent', () => {
  let component: CreateLcComponent;
  let fixture: ComponentFixture<CreateLcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
