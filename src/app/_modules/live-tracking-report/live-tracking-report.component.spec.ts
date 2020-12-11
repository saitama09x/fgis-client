import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrackingReportComponent } from './live-tracking-report.component';

describe('LiveTrackingReportComponent', () => {
  let component: LiveTrackingReportComponent;
  let fixture: ComponentFixture<LiveTrackingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTrackingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTrackingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
