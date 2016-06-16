import { Component, OnInit } from '@angular/core';

const styles = require('./about.component.css');
const template = require('./about.component.html');

@Component({
  selector: 'app-about',
  styles: [ styles ],
  template
})
export class AboutComponent implements OnInit {
  title = 'About';

  constructor() {}

  ngOnInit() {
  }

}
