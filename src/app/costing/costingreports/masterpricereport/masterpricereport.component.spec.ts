import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterpricereportComponent } from './masterpricereport.component';

describe('MasterpricereportComponent', () => {
  let component: MasterpricereportComponent;
  let fixture: ComponentFixture<MasterpricereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterpricereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterpricereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
