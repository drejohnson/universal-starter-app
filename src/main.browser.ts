// Angular 2 Universal
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
// import { provideRouter } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

// Application
import { AppComponent } from './app';

// you must return bootstrap for client.ts
export function ngApp() {
  return bootstrap(AppComponent, [
    ...ROUTER_PROVIDERS,
    // provideRouter(AppRoutes),
    ...HTTP_PROVIDERS
  ]);
}
