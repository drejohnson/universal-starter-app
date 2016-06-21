// Angular 2
import { enableProdMode } from '@angular/core';

// Environment Providers
var PROVIDERS = [];

if (process.env.NODE_ENV === 'production') {
  // Production
  enableProdMode();

  PROVIDERS = [
    ...PROVIDERS
  ];

} else {
  // Development
  PROVIDERS = [
    ...PROVIDERS
  ];
}

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
