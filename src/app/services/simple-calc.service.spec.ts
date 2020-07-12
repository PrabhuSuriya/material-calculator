import { TestBed } from '@angular/core/testing';

import { SimpleCalcService } from './simple-calc.service';

describe('SimpleCalcService', () => {
  let service: SimpleCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
