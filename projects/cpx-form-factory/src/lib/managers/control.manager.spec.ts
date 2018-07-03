import { TestBed, inject } from '@angular/core/testing';

import { ControlManager } from './control.manager';

describe('ControlManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ControlManager]
    });
  });

  it('should be created', inject([ ControlManager], ( service: ControlManager) => {
    expect(service).toBeTruthy();
  }));
});
