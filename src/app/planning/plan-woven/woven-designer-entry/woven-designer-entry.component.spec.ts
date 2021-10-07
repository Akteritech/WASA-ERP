import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WovenDesignerEntryComponent } from './woven-designer-entry.component';

describe('WovenDesignerEntryComponent', () => {
  let component: WovenDesignerEntryComponent;
  let fixture: ComponentFixture<WovenDesignerEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WovenDesignerEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WovenDesignerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
