import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftLetterComponent } from './draft-letter.component';

describe('DraftLetterComponent', () => {
  let component: DraftLetterComponent;
  let fixture: ComponentFixture<DraftLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
