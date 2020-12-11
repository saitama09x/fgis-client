import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiBeaconComponent } from './wifi-beacon.component';

describe('WifiBeaconComponent', () => {
  let component: WifiBeaconComponent;
  let fixture: ComponentFixture<WifiBeaconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiBeaconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiBeaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
