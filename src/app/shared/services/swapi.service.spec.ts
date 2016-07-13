/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SwapiService } from './swapi.service';

describe('Swapi Service', () => {
  beforeEachProviders(() => [SwapiService]);

  it('should ...',
      inject([SwapiService], (service: SwapiService) => {
    expect(service).toBeTruthy();
  }));
});
