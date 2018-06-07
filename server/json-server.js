const http = require('http');
const fs = require('fs');
const stream = require('stream');

const file = '../index.html';

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' }
  ]
};

const server = http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.on('error', (error) => {
      console.log(error);
    });
    req.on('error', (error) => {
      console.log(error);
    });

    res.end(JSON.stringify(product));
  });

server.listen(3003);