import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  moduleId: __filename,
  selector: 'app-root',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  providers: [
  ],
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})

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
