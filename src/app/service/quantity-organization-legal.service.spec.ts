
import { TestBed } from '@angular/core/testing';
import { QuantityOrganizationLegalService } from './quantity-organization-legal.service';

describe('QuantityOrganizationLegalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantityOrganizationLegalService = TestBed.get(QuantityOrganizationLegalService);
    expect(service).toBeTruthy();
  });
});
