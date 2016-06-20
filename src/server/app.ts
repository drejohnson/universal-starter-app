// the polyfills must be the first thing imported in node.js
import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
// import * as middleware from './middleware/index';

// Angular 2
import {enableProdMode} from '@angular/core';

// enable prod for faster renders
enableProdMode();

// Our API for demos only
import { serverApi } from './api';

import { ngApp } from '../main.node';

const DEV = process.env.NODE_ENV !== 'production';

const app = express();

app.use(compress())
  .set('env', process.env.NODE_ENV || 'development')
  .set('port', process.env.PORT || 8080)
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(methodOverride())
  .use(logger('dev'))

// if (DEV) {
//   const configs = require('../../webpack.config');
//   const webpack = require('webpack');
//   let compiler = webpack(configs[0]);

//   app.use(require("webpack-dev-middleware")(compiler, {
//     headers: {'Access-Control-Allow-Origin': '*'},
//     noInfo: true,
//     publicPath: compiler.options.output.publicPath,
//     stats: {
//       colors: true
//     }
//   }))
//   // .use(require("webpack-hot-middleware")(compiler))
// }

  .use(express.static(path.join(__dirname, '../dist')))

  // Serve static files
  .get('/data.json', serverApi)

  // Routes with html5pushstate
  .use('/', ngApp)
  .use('/home', ngApp)
  .use('/about', ngApp);

export default app;


