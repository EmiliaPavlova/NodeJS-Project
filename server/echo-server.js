const http = require('http');

const hostname = 'localhost';
const port = 3003;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.statusCode = 200;
    res.end('Done');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});