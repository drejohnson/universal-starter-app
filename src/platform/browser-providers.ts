/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { provideRouter } from '@angular/router';
// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {
  APOLLO_PROVIDERS
} from 'angular2-apollo';

// Angular 2 Material
// TODO(gdi2290): replace with @angular2-material/all
// import { MATERIAL_PROVIDERS } from './browser/angular2-material2';

import { APP_ROUTER_PROVIDERS } from '../app/app.routes';

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),
  ...HTTP_PROVIDERS,
  ...APP_ROUTER_PROVIDERS,
  ...APOLLO_PROVIDERS
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
