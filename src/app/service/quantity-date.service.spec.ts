
import { TestBed } from '@angular/core/testing';
import { QuantityDateService } from './quantity-date.service';

describe('QuantityDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantityDateService = TestBed.get(QuantityDateService);
    expect(service).toBeTruthy();
  });
});
