import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOffsetJobcardComponent } from './show-offset-jobcard.component';

describe('ShowOffsetJobcardComponent', () => {
  let component: ShowOffsetJobcardComponent;
  let fixture: ComponentFixture<ShowOffsetJobcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOffsetJobcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOffsetJobcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
