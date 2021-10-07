import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNexgenPiComponent } from './show-nexgen-pi.component';

describe('ShowNexgenPiComponent', () => {
  let component: ShowNexgenPiComponent;
  let fixture: ComponentFixture<ShowNexgenPiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNexgenPiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNexgenPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
