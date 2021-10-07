import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWovenCommonDetailsComponent } from './show-woven-common-details.component';

describe('ShowWovenCommonDetailsComponent', () => {
  let component: ShowWovenCommonDetailsComponent;
  let fixture: ComponentFixture<ShowWovenCommonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWovenCommonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWovenCommonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
