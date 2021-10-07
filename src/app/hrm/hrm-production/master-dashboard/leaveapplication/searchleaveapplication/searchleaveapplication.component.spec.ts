import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchleaveapplicationComponent } from './searchleaveapplication.component';

describe('SearchleaveapplicationComponent', () => {
  let component: SearchleaveapplicationComponent;
  let fixture: ComponentFixture<SearchleaveapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchleaveapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchleaveapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
