import { TestBed, inject } from '@angular/core/testing';

import { ValidatorManager } from './validator.manager';

describe('ValidatorManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValidatorManager]
    });
  });

  it('should be created', inject([ ValidatorManager], ( service: ValidatorManager) => {
    expect(service).toBeTruthy();
  }));
});
