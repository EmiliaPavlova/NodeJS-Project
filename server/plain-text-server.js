const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(3003);

/*
require('http')
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Hello World')
  })
  .listen(3003);
  */
