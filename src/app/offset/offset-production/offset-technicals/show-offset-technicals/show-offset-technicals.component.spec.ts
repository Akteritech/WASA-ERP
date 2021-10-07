import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOffsetTechnicalsComponent } from './show-offset-technicals.component';

describe('ShowOffsetTechnicalsComponent', () => {
  let component: ShowOffsetTechnicalsComponent;
  let fixture: ComponentFixture<ShowOffsetTechnicalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOffsetTechnicalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOffsetTechnicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
