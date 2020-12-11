import { TestBed } from '@angular/core/testing';

import { FaceDataService } from './face-data.service';

describe('FaceDataService', () => {
  let service: FaceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
