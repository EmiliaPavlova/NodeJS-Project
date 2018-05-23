#!/c/Program Files/nodejs/env node

const csv = require("csvtojson");
const fs = require('fs');
const program = require('commander');
const stream = require('stream');

let getAction = (action) => {
    return action;
}

let getFile = (file) => {
    return file;
}

let showHelp = () => {
    program.help();
}

let reverseStringFunction = () => {
    console.log('function to reverse string data from process.stdin to process.stdout');

    process.stdin
        .pipe(new stream.Transform({
            transform: (chunk, encoding, callback) => {
                callback(null, chunk.reverse())
            }
        }))
        .pipe(process.stdout);
}

let transformDataToUpperCase = () => {
    console.log('function to convert data from process.stdin to upper-cased data on process.stdout.');

    process.stdin
        .pipe(new stream.Transform({
            transform: (chunk, encoding, callback) => {
                callback(null, chunk.toString().toUpperCase())
            }
        }))
        .pipe(process.stdout);
}

let outputFile = () => {
    console.log('function that will use fs.createReadStream() to pipe the given file provided by --file option to process.stdout');

    const pathFile = `./data/${program.file}`;
    fs.createReadStream(pathFile)
        .pipe(new stream.Transform({
            transform: (chunk, encoding, callback) => {
                callback(null, chunk.toString())
            }
        }))
        .pipe(process.stdout);
}

let convertFromFile = () => {
    console.log('convert file provided by --file option from csv to json and output data to process.stdout. Function should check that the passed file name is valid');

    const pathFile = `./data/${program.file}`;
    csv()
        .fromFile(pathFile)
        .then((jsonArrayObj) => { //when parse finished, result will be emitted here.
            console.log(jsonArrayObj);
        })
    // fs.createReadStream(pathFile)
    //     .pipe(fs.createWriteStream(file + '.json'));
}

let convertToFile = () => {
    console.log('convert file provided by --file option from csv to json and output data to a result file with the same name but json extension. Function should check that the passed file name is valid and use fs.createWriteStream additionally');
}

program
    .version('0.1.0')
    .option('-a, --action <action>', 'Action to be performed', getAction)
    .option('-f, --file <file>', 'File', getFile)
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
        outputFile(program.file);
        break;
    case 'convertFromFile':
        convertFromFile()
        break;
    case 'convertToFile':
        convertToFile();
        break;
    default:
        return;
}

console.log('program.args', program.args);

//if (!program.args.length) {
 //   console.log('Wrong input: no arguments provided');
 //   program.help();
//} 

// https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
