import { TestBed, inject } from '@angular/core/testing';

import { ModelManager } from './model.manager';

describe('ModelManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ModelManager]
    });
  });

  it('should be created', inject([ ModelManager], ( service: ModelManager) => {
    expect(service).toBeTruthy();
  }));
});
