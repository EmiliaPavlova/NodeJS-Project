import http from 'http';

import config from './config/config';
import models from './models';

const userModule = new models.user.User('User module');
const productModule = new models.product.Product('Product module');

const hostname = 'localhost';
const port = 3003;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(config.name);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
  console.log(config.name);
  console.log(userModule.print());
  console.log(productModule.print());
});