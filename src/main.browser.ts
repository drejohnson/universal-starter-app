/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import { PLATFORM_PROVIDERS } from './platform/browser';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

// AngularFire2
// import {
//   FIREBASE_PROVIDERS,
//   defaultFirebase,
//   firebaseAuthConfig,
//   AuthProviders,
//   AuthMethods
// } from 'angularfire2';

// @ngrx
// import { provideStore } from '@ngrx/store';
// import { provideRouter } from '@ngrx/router';

// Application
import { AppComponent, APP_PROVIDERS } from './app';

// you must return bootstrap for client.ts
export function ngApp() {
  return bootstrap(AppComponent, [
    ...PLATFORM_PROVIDERS,
    ...APP_PROVIDERS,
    // provideRouter(AppRoutes),
    // defaultFirebase({
    //   apiKey: 'AIzaSyCjbUArzw7nlQudFiZFfEns6rWaKmJRO60',
    //   authDomain: 'phreshr-7d876.firebaseapp.com',
    //   databaseURL: 'https://phreshr-7d876.firebaseio.com',
    //   storageBucket: 'phreshr-7d876.appspot.com',
    // }),
    // firebaseAuthConfig({
    //   provider: AuthProviders.Github,
    //   method: AuthMethods.Popup
    // }),
  ])
   .catch(err => console.error(err));
}
