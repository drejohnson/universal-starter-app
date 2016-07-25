import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-about',
  providers: [],
  styleUrls: [ 'about.component.css' ],
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {
  title = 'About';
  data: {};
  server: string;
  siteTitle = 'About - Unviversal App';
  siteDescription = 'App utilizing Angular 2 Universal, Webpack, Ngrx, Graphql';
  siteOgImage = '/assets/images/home.png';
  siteOgUrl = 'http://localhost:8080';
  siteOgSiteName = this.title;

  constructor(private http: Http) {}

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
