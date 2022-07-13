import { TestBed } from '@angular/core/testing';

import { DataRequestStatusService } from './data-request-status.service';

describe('DataRequestStatusService', () => {
  let service: DataRequestStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRequestStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
