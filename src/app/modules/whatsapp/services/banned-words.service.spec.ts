import { TestBed } from '@angular/core/testing';

import { BannedWordsService } from './banned-words.service';

describe('BannedWordsService', () => {
  let service: BannedWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannedWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
