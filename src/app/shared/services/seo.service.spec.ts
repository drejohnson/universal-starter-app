/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SeoService } from './seo.service';

describe('Seo Service', () => {
  beforeEachProviders(() => [SeoService]);

  it('should ...',
      inject([SeoService], (service: SeoService) => {
    expect(service).toBeTruthy();
  }));
});
