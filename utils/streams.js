const fs = require('fs');
const program = require('commander');
const stream = require('stream');
const Converter = require("csvtojson").Converter;
const https = require('https');
const readline = require('readline');
const { google } = require('googleapis');

const path = './data';
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'credentials.json';

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

let readDataFromUrl = () => {
    fs.readFile('client_secret.json', (err, content) => {
        if (err) {
            return console.log('Error loading client secret file: ', err);
        }
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), getFileId);
    });
}

let authorize = (credentials, callback) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            return getAccessToken(oAuth2Client, callback);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

let getAccessToken = (oAuth2Client, callback) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const code = '4/AACskZnRGbGHmTehSnqdorozGsk4WxJ9nQRL3MS5O_oLEAf5mGNHM6o';
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        console.log('code', code);
        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                return callback(err);
            }
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) {
                console.error(err);
            }
            console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

let getFileId = (auth) => {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
        pageSize: 100,
        fields: 'nextPageToken, files(id, name)',
    }, (err, {data}) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = data.files;
        if (files.length) {
            files.filter((file) => {
                if (file.name === 'nodejs-homework3.css') {
                    console.log(file.id);
                    return file.id;
                }
            });
        } else {
            console.log('No files found.');
        }
    });
}

let createCssBundler = () => {
    // if (`${program.path}/bundle.css`) {
    //     fs.unlink(`${program.path}/bundle.css`);
    // }
    getAllFiles();
    // readDataFromUrl();
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
