import { TestBed } from '@angular/core/testing';

import { WifiBeaconService } from './wifi-beacon.service';

describe('WifiBeaconService', () => {
  let service: WifiBeaconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiBeaconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
