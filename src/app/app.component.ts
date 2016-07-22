import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  moduleId: __filename,
  selector: 'app-root',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  encapsulation: ViewEncapsulation.Native,
  styleUrls: [ 'app.component.css' ],
  templateUrl: 'app.component.html'
})

export class AppComponent {
  title = 'Universal App';

  constructor(
    private http: Http) {}
}
