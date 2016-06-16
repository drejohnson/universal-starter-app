import { Component, OnInit } from '@angular/core';

const styles = require('./home.component.css');
const template = require('./home.component.html');

@Component({
  selector: 'app-home',
  styles: [ styles ],
  template
})
export class HomeComponent implements OnInit {
  title = 'Home';

  constructor() {}

  ngOnInit() {
  }

}
