// the polyfills must be the first thing imported in node.js
import 'angular2-universal/polyfills';
// Angular 2
import { enableProdMode } from '@angular/core';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
// import * as middleware from './middleware/index';

// Our API for demos only
import { serverApi } from './api';

// enable prod for faster renders
if (process.env.NODE_ENV === 'production') {
  // Production
  enableProdMode();
}

import { ngApp } from '../main.node';

dotenv.config({ silent: true });

const DEV = process.env.NODE_ENV !== 'production';

const app = express();

app.use(compress())
  .set('env', process.env.NODE_ENV || 'development')
  .set('port', process.env.PORT || 8080)
  .set('graphQLPort', process.env.GRAPHQL_PORT || 8888)
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(methodOverride())
  .use(logger('dev'))
  .use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}))
  .use(express.static(path.join(__dirname, '../dist/client'), {index: false}))
  // Serve static files
  .get('/data.json', serverApi)
  // Routes with html5pushstate
  .use('/', ngApp)
  .use('/home', ngApp)
  .use('/about', ngApp)
  .get('*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const pojo = { status: 404, message: 'No Content' };
    const json = JSON.stringify(pojo, null, 2);
    res.status(404).send(json);
  });

export default app;


