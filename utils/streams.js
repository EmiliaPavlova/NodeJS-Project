#!/c/Program Files/nodejs/env node
// #!/usr/bin/env node
// 'use strict';

const program = require('commander');

/*
    let listFunction = (directory, options) => {
    const cmd = 'ls';
    let params = [];
    if (options.all) params.push('a');
    if (options.long) params.push('l');
    let fullCommand = params.length 
        ? cmd + ' -' + params.join('')
        : cmd
    if (directory) fullCommand += ' ' + directory;

    let execCallback = (error, stdout, stderr) => {
        if (error) console.log("exec error: " + error);
        if (stdout) console.log("Result: " + stdout);
        if (stderr) console.log("shell error: " + stderr);
    };
    exec(fullCommand, execCallback);
};
*/

let getAction = (action, file) => {
    console.log(action);
    // switch(action) {
    //     case 'reverse':
    //         reverseStringFunction(option)
    //         break;
    //     case 'transform':
    //         break;
    //     case 'outputFile':
    //         break;
    //     case 'convertFromFile':
    //         break;
    //     case 'convertToFile':
    //         break;
    //     default:
    //         return;
    // }
}

let getFile = (file) => {
    console.log(file);
}

let reverseStringFunction = (string) => {
    // TODO - reverse string data from process.stdin to process.stdout
    console.log(string.split('').reverse().join(''));

program
    .command('reverse <str>')
    .description('reverse string data from process.stdin to process.stdout')
    .action((str) => {
        reverseStringFunction(str);
    })
}

/*
program
    .command('transform <str>')
    .description('convert data from process.stdin to upper-cased data on process.stdout')
    .action((str) => {
        console.log('??');
    })

program
    .command('outputFile <filePath>')
    .description('pipe the given file provided by --file option to process.stdout')
    .action((filePath) => {
        console.log('??');
    })

program
    .command('convertToFile <filePath>')
    .description('pipe the given file provided by --file option to process.stdout')
    .action((filePath) => {
        console.log('??');
    })

program
    .command('convertFromFile <filePath>')
    .description('convert file provided by --file option from csv to json and output data to a result file with the same name but json extension')
    .action((filePath) => {
        console.log('??');
    })
*/

program
  .version('0.1.0')
//   .arguments('<action> [file]')
  .option('-a, --action <action> [string]', 'Action to be performed', getAction)
  .option('-f, --file <file>', 'File', getFile)
//   .action( (action, file) => {
//     cmdValue = action;
//     envValue = file;
//  });
//   .parse(process.argv);

program.parse(process.argv);
// console.log('action:', cmdValue);
// console.log('file:', envValue);

if (!program.args.length) {
    program.help();
} 

// https://tj.github.io/commander.js/
// https://medium.freecodecamp.org/writing-command-line-applications-in-nodejs-2cf8327eee2
// http://cruft.io/posts/node-command-line-utilities/
