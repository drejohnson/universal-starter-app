import { RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';

export const routes: RouterConfig = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**',    component: HomeComponent }
];
