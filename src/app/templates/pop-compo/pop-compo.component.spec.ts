import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopCompoComponent } from './pop-compo.component';

describe('PopCompoComponent', () => {
  let component: PopCompoComponent;
  let fixture: ComponentFixture<PopCompoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopCompoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
