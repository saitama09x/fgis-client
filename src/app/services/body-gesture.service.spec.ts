import { TestBed } from '@angular/core/testing';

import { BodyGestureService } from './body-gesture.service';

describe('BodyGestureService', () => {
  let service: BodyGestureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyGestureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
