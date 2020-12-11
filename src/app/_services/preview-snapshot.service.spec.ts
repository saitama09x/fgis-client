import { TestBed } from '@angular/core/testing';

import { PreviewSnapshotService } from './preview-snapshot.service';

describe('PreviewSnapshotService', () => {
  let service: PreviewSnapshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewSnapshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
