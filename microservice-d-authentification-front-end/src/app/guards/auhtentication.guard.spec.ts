import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { auhtenticationGuard } from './auhtentication.guard';

describe('auhtenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auhtenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
