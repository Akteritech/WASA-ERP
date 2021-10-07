import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCreateWoComponent } from './show-create-wo.component';

describe('ShowCreateWoComponent', () => {
  let component: ShowCreateWoComponent;
  let fixture: ComponentFixture<ShowCreateWoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCreateWoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCreateWoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
