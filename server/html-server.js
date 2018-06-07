const http = require('http');
const fs = require('fs');
const stream = require('stream');

const file = '../index.html';
const fileContent = fs.readFileSync('__dirname/' + file, 'utf8');
const replacedFileContent = fileContent.replace('{message}', 'replaced message with \'message\'');

const server = http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // res.write(replacedFileContent);
    const readStream = fs.createReadStream('__dirname/' + file);
    readStream.on('end', ()=> res.end());
    readStream
      .pipe(new stream.Transform({
        transform: (chunk, encoding, callback) => {
          callback(null, chunk.toString().replace('{message}', 'replaced message o.O'));
        }
      }))
      .pipe(res);
  });

server.listen(3003);