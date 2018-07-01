import { TestBed, inject } from '@angular/core/testing';

import { ValidatorManagerService } from './validator-manager.service';

describe('ValidatorManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorManagerService]
    });
  });

  it('should be created', inject([ValidatorManagerService], (service: ValidatorManagerService) => {
    expect(service).toBeTruthy();
  }));
});
