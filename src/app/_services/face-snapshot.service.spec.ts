import { TestBed } from '@angular/core/testing';

import { FaceSnapshotService } from './face-snapshot.service';

describe('FaceSnapshotService', () => {
  let service: FaceSnapshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaceSnapshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
