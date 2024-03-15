import { TestBed } from '@angular/core/testing';

import { ValidationMsgService } from './validation-msg.service';

describe('ValidationMsgService', () => {
  let service: ValidationMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
