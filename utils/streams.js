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

let getAction = (action) => {
    return action;
}

let getFile = (file) => {
    return file;
}

let getString = (string) => {
    return string;
}

let reverseStringFunction = () => {
    // TODO - reverse string data from process.stdin to process.stdout
    // console.log(string.split('').reverse().join(''));

    // /*
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function(line){
        if(line == "expectedinput") console.log("got it!");
        console.log(line);
    })
    // */
}


program
    .version('0.1.0')
    .option('-a, --action <action>', 'Action to be performed', getAction)
    .option('-s, --string [string]', 'String', getString)
    .option('-f, --file [file]', 'File', getFile)
    .parse(process.argv);

// const action = process.argv[2].split('=')[1];
// const file = process.argv[3].split('=')[1];
// console.log(action, file);

// program.parse(process.argv);

switch(program.action) {
    case 'reverse':
        // reverseStringFunction(program.string)
        reverseStringFunction()
        break;
    case 'transform':
        break;
    case 'outputFile':
        break;
    case 'convertFromFile':
        break;
    case 'convertToFile':
        break;
    default:
        return;
}


if (!program.args.length) {
    console.log('Wrong input: no arguments provided');
    program.help();
} 

// https://nodejs.org/api/process.html#process_process_stdin
// https://tj.github.io/commander.js/
// https://medium.freecodecamp.org/writing-command-line-applications-in-nodejs-2cf8327eee2
