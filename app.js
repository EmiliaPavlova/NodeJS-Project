import http from 'http';

import config from './config/config';
import { DirWatcher } from './dirwatcher';
import { EventEmitter } from 'events';
import { Importer } from './importer';
import * as model from './models';
import routes from './routes/routers';
import express from 'express';

import cookieParser from './middlewares/cookie-parser-middleware';
import queryParser from './middlewares/query-string-parser-middleware';
import routers from './routes/routers';

const app = express();

app.use(cookieParser);
app.use(queryParser);

app.use(function (req, res, next) {
  console.log('cookies', req.parsedCookies);
  console.log('queries', req.parsedQuery);
  next();
});

routes(app);

app.get('/', (req, res) => res.send('Hello World!'));

console.log(config.name);

const userModule = new model.User('User module');
const productModule = new model.Product('Product module');
const event = new EventEmitter();

new DirWatcher(event, './data', 1000);
new Importer(event);

/*
const hostname = 'localhost';
const port = 3003;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(config.name);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
*/

export default app;