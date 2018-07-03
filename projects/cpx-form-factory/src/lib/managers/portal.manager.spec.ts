import { TestBed, inject } from '@angular/core/testing';

import { PortalManager } from './portal.manager';

describe('PortalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PortalManager]
    });
  });

  it('should be created', inject([ PortalManager], ( service: PortalManager) => {
    expect(service).toBeTruthy();
  }));
});
