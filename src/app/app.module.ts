// Waiting for AppModule release

// import { AppModule, enableProdMode, ApplicationRef } from '@angular/core';
// import { BrowserModule  } from '@angular/platform-browser';
// import {
//   FORM_DIRECTIVES,
//   FormsModule,
//   disableDeprecatedForms,
//   provideForms
// } from '@angular/forms';
// import { ROUTER_DIRECTIVES, provideRoutes } from '@angular/router';

// import { AppComponent } from './app.component';
// import { routes } from './app.routes';

// @AppModule({
//   modules: [BrowserModule, FormsModule, RouterModule, FirebaseModule],
//   providers: [
//     provideRoutes(routes),
//     {provide: FirebaseConfig, useClass: MyFirebaseConfig},
//   ],
//   precompile: [AppComponent],
// })
// export class AppModule {
//   constructor(appRef: ApplicationRef) {
//     appRef.bootstrap(AppComponent);
//   }
// }

// // Manual configuration
// class MyFirebaseConfig implements FirebaseConfig {
//   apiKey;
//   authDomain;
//   databaseURL;
//   storageBucket;

//   constructor() {
//     // Get parameters from environment
//     this.apiKey = "";
//     this.authDomain = "";
//     this.databaseURL = "";
//     this.storageBucket = "";
//   }
// };
