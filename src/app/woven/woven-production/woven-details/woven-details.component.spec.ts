import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WovenDetailsComponent } from './woven-details.component';

describe('WovenDetailsComponent', () => {
  let component: WovenDetailsComponent;
  let fixture: ComponentFixture<WovenDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WovenDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WovenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
