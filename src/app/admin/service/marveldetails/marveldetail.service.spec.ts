import { TestBed } from '@angular/core/testing';

import { MarveldetailService } from './marveldetail.service';

describe('MarveldetailService', () => {
  let service: MarveldetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarveldetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
