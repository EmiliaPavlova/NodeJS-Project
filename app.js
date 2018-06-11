import http from 'http';

import config from './config/config';
import { DirWatcher } from './dirwatcher';
import { EventEmitter } from 'events';
import { Importer } from './importer';
import * as model from './models';

import express from 'express';
const app = express();

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