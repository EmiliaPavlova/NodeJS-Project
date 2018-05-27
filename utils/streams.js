const fs = require('fs');
const program = require('commander');
const stream = require('stream');
const Converter = require("csvtojson").Converter;
const https = require('https');

const path = './data';

let getAction = (action) => {
    return action;
}

let getFile = (file) => {
    checkForFile();
    return file;
}

let getPath = (path) => {
    return path;
}

let showHelp = () => {
    program.help();
}

let getFilePath = (file) => {
    return `./data/${file}`;
}

let checkForFile = () => {
    if (!program.file) {
        console.log('Wrong input: no such file');
        process.exit();
    }
}

let reverseStringFunction = () => {
    process.stdin
        .pipe(new stream.Transform({
            transform: (chunk, encoding, callback) => {
                callback(null, chunk.reverse())
            }
        }))
        .pipe(process.stdout);
}

let transformDataToUpperCase = () => {
    process.stdin
        .pipe(new stream.Transform({
            transform: (chunk, encoding, callback) => {
                callback(null, chunk.toString().toUpperCase())
            }
        }))
        .pipe(process.stdout);
}

let outputFile = () => {
    const pathFile = getFilePath(program.file);
    fs.createReadStream(pathFile)
        .pipe(new stream.Transform({
            transform: (chunk, encoding, callback) => {
                callback(null, chunk.toString())
            }
        }))
        .pipe(process.stdout);
}

let convertFromFile = () => {
    const pathFile = getFilePath(program.file);
    fs.createReadStream(pathFile)
        .pipe(new Converter({}))
        .pipe(process.stdout);
}

let convertToFile = () => {
    const pathFile = getFilePath(program.file);
    const index = pathFile.lastIndexOf('.csv');
    const newFile = `${pathFile.substring(0, index)}.json`;
    const writeStream = fs.createWriteStream(newFile);

    fs.createReadStream(pathFile)
        .pipe(new Converter({}))
        .pipe(writeStream);
}

let getAllFiles = () => {
    const allFiles = fs.readdirSync(program.path);
    const writeStream = fs.createWriteStream(`${program.path}/bundle.css`);
    allFiles.map(file => {
        if (fs.statSync(program.path).isDirectory()) {
            fs.createReadStream(`${program.path}/${file}`)
                .pipe(new stream.Transform({
                    transform: (chunk, encoding, callback) => {
                        callback(null, chunk.toString() + '\n\n')
                    }
                }))
                .pipe(writeStream);
        } else {
            console.log('Not a directory');
        }
    })
}

let readDataFromUrl = () => {
    const url = 'https://epa.ms/nodejs18-hw3-css';
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          console.log(JSON.parse(data).explanation);
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}

let createCssBundler = () => {
    if (`${program.path}/bundle.css`) {
        fs.unlink(`${program.path}/bundle.css`);
    }
    getAllFiles();
    readDataFromUrl();
}

program
    .version('0.1.0')
    .option('-a, --action <action>', 'Action to be performed', getAction)
    .option('-f, --file <file>', 'File', getFile)
    .option('-p, --path <path>', 'Path', getPath)
    .option('-h, --help', 'Help', showHelp)
    .parse(process.argv);

switch(program.action) {
    case 'reverse':
        reverseStringFunction()
        break;
    case 'transform':
        transformDataToUpperCase();
        break;
    case 'outputFile':
        outputFile();
        break;
    case 'convertFromFile':
        convertFromFile()
        break;
    case 'convertToFile':
        convertToFile();
        break;
    case 'cssBundler':
        createCssBundler();
        break;
    default:
        console.error('Error: no such command!');
        process.exit();
}

// https://developers.google.com/drive/api/v3/quickstart/nodejs
// https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
