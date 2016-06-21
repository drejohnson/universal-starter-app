// Angular 2 Universal
import 'angular2-universal/polyfills';
import {
  provide,
  REQUEST_URL,
  ORIGIN_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  Bootloader
} from 'angular2-universal';

import { APP_BASE_HREF } from '@angular/common';

// ngrx
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@ngrx/router';

import { AppComponent } from './app';

const bootloader = new Bootloader({
  platformProviders: [
    {provide: ORIGIN_URL, useValue: 'http://localhost:8080'},
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  async: true,
  preboot: false // { appRoot: 'app' } // your top level app component selector
});

export function ngApp(req, res) {
  // const template = require('./main.html');
  let url = req.originalUrl || '/';

  const config = {
    templateUrl: 'main.html',
    directives: [AppComponent],
    providers: [
      {provide: REQUEST_URL, useValue: url},
      ...NODE_ROUTER_PROVIDERS,
      ...NODE_HTTP_PROVIDERS
    ]
  };

  bootloader.serializeApplication(config)
  .then(html => res.send(html));
}
