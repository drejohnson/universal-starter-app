import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  styleUrls: [ 'about.component.css' ],
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {
  title = 'About';

  constructor() {}

  ngOnInit() {
  }

}
