import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovsComponent } from './lovs.component';

describe('LovsComponent', () => {
  let component: LovsComponent;
  let fixture: ComponentFixture<LovsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LovsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
