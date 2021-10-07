import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsectionComponent } from './showsection.component';

describe('ShowsectionComponent', () => {
  let component: ShowsectionComponent;
  let fixture: ComponentFixture<ShowsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
