import { TestBed } from '@angular/core/testing';

import { AddressAccountService } from './address-account.service';

describe('AddressAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressAccountService = TestBed.get(AddressAccountService);
    expect(service).toBeTruthy();
  });
});
