import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NotFoundComponent } from './not-found';

export const routes: RouterConfig = [
  { path: '',      component: HomeComponent, terminal: true },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
