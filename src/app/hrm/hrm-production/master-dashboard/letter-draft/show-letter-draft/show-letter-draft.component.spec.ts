import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLetterDraftComponent } from './show-letter-draft.component';

describe('ShowLetterDraftComponent', () => {
  let component: ShowLetterDraftComponent;
  let fixture: ComponentFixture<ShowLetterDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLetterDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLetterDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
