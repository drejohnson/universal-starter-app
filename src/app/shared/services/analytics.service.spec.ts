/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';

describe('Analytics Service', () => {
  beforeEachProviders(() => [AnalyticsService]);

  it('should ...',
      inject([AnalyticsService], (service: AnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
