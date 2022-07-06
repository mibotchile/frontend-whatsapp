import { TestBed } from '@angular/core/testing';

import { MessagesSocketService } from './messages-socket.service';

describe('MessagesSocketService', () => {
  let service: MessagesSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
