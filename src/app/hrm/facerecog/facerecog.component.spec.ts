import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacerecogComponent } from './facerecog.component';

describe('FacerecogComponent', () => {
  let component: FacerecogComponent;
  let fixture: ComponentFixture<FacerecogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacerecogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacerecogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
