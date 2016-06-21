import { Component, Directive, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Http } from '@angular/http';

import { HomeComponent } from './+home';
import { AboutComponent } from './+about';

@Component({
  moduleId: __filename,
  selector: 'app-root',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  providers: [
  ],
  styles: [`
    :host {
      display: block;
    }
    h1 {
      font-size: 62px;
      margin: 0;
    }
    nav a {
      text-transform: uppercase;
    }
  `],
  templateUrl: 'app.component.html'
})
@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true },
  { path: '/home', component: HomeComponent, name: 'Home' },
  { path: '/about', component: AboutComponent, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {

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
