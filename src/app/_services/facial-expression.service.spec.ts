import { TestBed } from '@angular/core/testing';

import { FacialExpressionService } from './facial-expression.service';

describe('FacialExpressionService', () => {
  let service: FacialExpressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacialExpressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
