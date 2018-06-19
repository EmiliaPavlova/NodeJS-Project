const http = require('http');

const hostname = 'localhost';
const port = 3003;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    req.on('error', (error) => {
        console.log(error);
    });
    res.on('error', (error) => {
        console.log(error);
    });

    req.on('data', (message) => {
        res.write(message);
    });
    req.on('end', () => {
        res.end();
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}: ${port}`);
});