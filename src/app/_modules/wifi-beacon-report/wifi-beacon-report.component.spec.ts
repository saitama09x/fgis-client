import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiBeaconReportComponent } from './wifi-beacon-report.component';

describe('WifiBeaconReportComponent', () => {
  let component: WifiBeaconReportComponent;
  let fixture: ComponentFixture<WifiBeaconReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiBeaconReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiBeaconReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
