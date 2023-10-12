
import { TestBed } from '@angular/core/testing';
import { OrganizationLegalService } from './organization-legal.service';

describe('OrganizationLegalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationLegalService = TestBed.get(OrganizationLegalService);
    expect(service).toBeTruthy();
  });
});
