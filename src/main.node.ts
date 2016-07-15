import {
  provide,
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  Bootloader,
  isNode
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// ngrx
// import { provideStore } from '@ngrx/store';
// import { provideRouter } from '@ngrx/router';

import { AppComponent } from './app';
import { routes } from './app/app.routes';

if (isNode) {
  console.log('isNode: True');
}
const bootloader = new Bootloader({
  platformProviders: [
    {provide: ORIGIN_URL, useValue: 'http://localhost:8080'},
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  async: true,
  preboot: false // { appRoot: 'app' } // your top level app component selector
});

export function ngApp(req, res) {
  let url = req.originalUrl || '/';

  const AppConfig = {
    templateUrl: 'main.html',
    directives: [AppComponent],
    providers: [
      {provide: REQUEST_URL, useValue: url},
      provideRouter(routes),
      ...NODE_HTTP_PROVIDERS,
      ...NODE_LOCATION_PROVIDERS
    ]
  };

  bootloader.serializeApplication(AppConfig)
  .then(html => res.send(html));
}
