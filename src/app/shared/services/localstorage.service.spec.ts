/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { LocalstorageService } from './localstorage.service';

describe('Localstorage Service', () => {
  beforeEachProviders(() => [LocalstorageService]);

  it('should ...',
      inject([LocalstorageService], (service: LocalstorageService) => {
    expect(service).toBeTruthy();
  }));
});
