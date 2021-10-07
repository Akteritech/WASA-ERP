import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBywaysPiComponent } from './show-byways-pi.component';

describe('ShowBywaysPiComponent', () => {
  let component: ShowBywaysPiComponent;
  let fixture: ComponentFixture<ShowBywaysPiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBywaysPiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBywaysPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
