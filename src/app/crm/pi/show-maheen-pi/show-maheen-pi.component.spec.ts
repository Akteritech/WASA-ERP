import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMaheenPiComponent } from './show-maheen-pi.component';

describe('ShowMaheenPiComponent', () => {
  let component: ShowMaheenPiComponent;
  let fixture: ComponentFixture<ShowMaheenPiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMaheenPiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMaheenPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
