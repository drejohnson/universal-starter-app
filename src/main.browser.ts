/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import { PLATFORM_PROVIDERS } from './platform/browser';

// Application
import { AppComponent, APP_PROVIDERS } from './app';

// you must return bootstrap for client.ts
export function ngApp(): Promise<any> {
  return bootstrap(AppComponent, [
    ...PLATFORM_PROVIDERS,
    ...APP_PROVIDERS
  ])
   .catch(err => console.error(err));
}
