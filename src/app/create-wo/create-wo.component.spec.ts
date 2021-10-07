import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWOComponent } from './create-wo.component';

describe('CreateWOComponent', () => {
  let component: CreateWOComponent;
  let fixture: ComponentFixture<CreateWOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
