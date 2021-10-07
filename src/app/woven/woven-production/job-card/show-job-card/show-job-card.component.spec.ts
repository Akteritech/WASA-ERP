import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobCardComponent } from './show-job-card.component';

describe('ShowJobCardComponent', () => {
  let component: ShowJobCardComponent;
  let fixture: ComponentFixture<ShowJobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowJobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
