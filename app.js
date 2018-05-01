import http from 'http';

import config from './config/config';
import dirwatcher from './dirwatcher';
import importer from './importer';
import * as model from './models';

const userModule = new model.User('User module');
const productModule = new model.Product('Product module');

const hostname = 'localhost';
const port = 3003;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(config.name);
});

console.log(config.name);
console.log('dirwatcher', dirwatcher);
console.log('importer', importer);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});