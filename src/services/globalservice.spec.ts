import { TestBed } from '@angular/core/testing';

import { Globalservice } from './globalservice';

describe('Globalservice', () => {
  let service: Globalservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Globalservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
