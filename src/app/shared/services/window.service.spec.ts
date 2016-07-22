/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { WindowService } from './window.service';

describe('Window Service', () => {
  beforeEachProviders(() => [WindowService]);

  it('should ...',
      inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
  }));
});
