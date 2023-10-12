
import { TestBed } from '@angular/core/testing';
import { LogOrganizationService } from './log-organization.service';

describe('LogOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogOrganizationService = TestBed.get(LogOrganizationService);
    expect(service).toBeTruthy();
  });
});
