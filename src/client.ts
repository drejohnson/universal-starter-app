// the polyfills must be the first thing imported
import 'angular2-universal/polyfills';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { prebootComplete } from 'angular2-universal';

// enable prod for faster renders
if (process.env.NODE_ENV === 'production') {
  // Production
  enableProdMode();
}

import { ngApp } from './main.browser';

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => {

  ngApp()
    .then(prebootComplete);

});
