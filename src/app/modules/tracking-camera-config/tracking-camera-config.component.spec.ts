import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCameraConfigComponent } from './tracking-camera-config.component';

describe('TrackingCameraConfigComponent', () => {
  let component: TrackingCameraConfigComponent;
  let fixture: ComponentFixture<TrackingCameraConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingCameraConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingCameraConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
