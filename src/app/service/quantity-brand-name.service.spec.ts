
import { TestBed } from '@angular/core/testing';
import { QuantityBrandNameService } from './quantity-brand-name.service';

describe('QuantityBrandNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantityBrandNameService = TestBed.get(QuantityBrandNameService);
    expect(service).toBeTruthy();
  });
});
