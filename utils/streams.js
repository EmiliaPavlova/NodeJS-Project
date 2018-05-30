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
    const pathFile = getFilePath(file);
    checkForFile(pathFile);
    return file;
}

let getPath = (path) => {
    return path;
}

let showHelp = () => {
    program.help();
}

let getFilePath = (file) => {
    checkForFile(`${path}/${file}`);
    return `${path}/${file}`;
}

let checkForFile = (filePath) => {
    fs.access(filePath, err => {
        if (err) {
            console.log('Wrong input: no such file');
            process.exit();
        }
    })
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

let getAllCssFiles = () => {
    const allFiles = fs.readdirSync(program.path);
    const writeStream = fs.createWriteStream(`${program.path}/bundle.css`);
    allFiles.map(file => {
        if (file !== 'bundle.css') {
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
        }
    })
}

let appendDataFromUrl = () => {
    // const url = 'https://drive.google.com/uc?export=download&id=1tCm9Xb4mok4Egy2WjGqdYYkrGia0eh7X';
    const url = 'https://doc-0g-0s-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/c9p5kmr970ag13es18fno77gj5m3ql02/1527688800000/05195043963524607236/*/1tCm9Xb4mok4Egy2WjGqdYYkrGia0eh7X?e=download';
    const bundleFile = `${program.path}/bundle.css`;

    https.get(url, (res) => {
        res.on('data', (data) => {
            fs.appendFile(bundleFile, data);
        });
    }).on('error', (err) => {
        console.error(err);
    });
}

let createCssBundler = () => {
    // if (`${program.path}/bundle.css`) {
    //     fs.unlink(`${program.path}/bundle.css`);
    // }
    getAllCssFiles();
    appendDataFromUrl();
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
