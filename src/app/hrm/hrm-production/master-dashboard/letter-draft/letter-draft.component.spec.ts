import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterDraftComponent } from './letter-draft.component';

describe('LetterDraftComponent', () => {
  let component: LetterDraftComponent;
  let fixture: ComponentFixture<LetterDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
