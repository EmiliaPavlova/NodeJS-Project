const http = require('http');

const server = http.createServer((req, res) => {
  res.end('<h1>Hello World</h1>');
});

// server.on('clientError', (err, socket) => {
//   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// });
server.listen(3003);

/*
require('http')
  .createServer()
  .on('request', (req, res) => {
    const { url, method } = req;
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end('<h1>Hello World</h1>')
  })
  .listen(3003);
  */