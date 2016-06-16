import { Component, Directive, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { Http } from '@angular/http';

import { HomeComponent } from './+home';
import { AboutComponent } from './+about';
import * as models from '../models';

const template = require('./app.component.html');

@Component({
  moduleId: __filename,
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  providers: [
  ],
  template
})
@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true },
  { path: '/home', component: HomeComponent, name: 'Home' },
  { path: '/about', component: AboutComponent, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {
  public genres: models.Channel[];

  title = 'My App';
  data = {};
  server: string;

  constructor(public http: Http) {}

  ngOnInit() {
    // limit the use of setTimeouts
    setTimeout(() => {
      this.server = 'This was rendered from the server!';
    }, 10);

    // use services for http calls
    this.http.get('/data.json')
      .subscribe(res => {
        this.data = res.json();
      });
  }
}
