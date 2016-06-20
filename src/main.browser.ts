// Angular 2 Universal
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
// import { APP_BASE_HREF } from '@angular/common';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
// import { provideRouter } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

// AngularFire2
// import {
//   FIREBASE_PROVIDERS,
//   defaultFirebase,
//   firebaseAuthConfig,
//   AuthProviders,
//   AuthMethods
// } from 'angularfire2';

// @ngrx
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@ngrx/router';

// Application
import { AppComponent } from './app';

const APPLICATION_PROVIDERS = [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  // ...FIREBASE_PROVIDERS
];

const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
];

export const APPLICATION_PIPES = [];

// you must return bootstrap for client.ts
export function ngApp() {
  return bootstrap(AppComponent, [
    ...APPLICATION_PROVIDERS,
    ...APPLICATION_DIRECTIVES,
    ...APPLICATION_PIPES,
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
    provide(PLATFORM_DIRECTIVES, {useValue: APPLICATION_DIRECTIVES, multi: true}),
    provide(PLATFORM_PIPES, {useValue: APPLICATION_PIPES, multi: true})
    // provide(APP_BASE_HREF, { useValue: '/' })
  ]);
}
