
import { TestBed } from '@angular/core/testing';
import { ErorInterceptorService } from './eror-interceptor.service';

describe('ErorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErorInterceptorService = TestBed.get(ErorInterceptorService);
    expect(service).toBeTruthy();
  });
});
