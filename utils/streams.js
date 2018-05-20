#!/usr/bin/env node
// #!/c/Program Files/nodejs/env node
'use strict';

const program = require('commander');

// import fs from 'fs';

function reverse(str) {
    // Make sure we got a filename on the command line.
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
    }
    // Read the file and print its contents.
    var fs = require('fs')
        , filename = process.argv[2];
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        console.log(data)
    });
 }
function transform(str) { /* ... */ }
function outputFile(filePath) { /* ... */ }
function convertFromFile(filePath) { /* ... */ }
function convertToFile(filePath) { /* ... */ }

/*
program
    .version('0.0.1')
    .option('-o, --option','option description')
    .option('-m, --more','we can have as many options as we want')
    .option('-i, --input [optional]','optional user input')
    .option('-I, --another-input <required>','required user input')
    .parse(process.argv); // end with parse to parse through the input
*/

program
    .version('0.0.1')
    .option('-C, --chdir <path>', 'change the working directory')
    .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    .option('-T, --no-tests', 'ignore test hook')

program
    .command('setup')
    .description('run remote setup commands')
    .action(function() {
    console.log('setup');
});

program
    .command('exec <cmd>')
    .description('run the given remote command')
    .action(function(cmd) {
    console.log('exec "%s"', cmd);
});

program
    .command('teardown <dir> [otherDirs...]')
    .description('run teardown commands')
    .action(function(dir, otherDirs) {
    console.log('dir "%s"', dir);
    if (otherDirs) {
        otherDirs.forEach(function (oDir) {
        console.log('dir "%s"', oDir);
        });
    }
});

program
    .command('*')
    .description('deploy the given env')
    .action(function(env) {
    console.log('deploying "%s"', env);
});

program.parse(process.argv);

/*
program
    .version('0.0.1')
    .usage('<keywords>')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    console.log('Keywords: ' + program.args);
}
*/

// https://tj.github.io/commander.js/
// https://medium.freecodecamp.org/writing-command-line-applications-in-nodejs-2cf8327eee2
// http://cruft.io/posts/node-command-line-utilities/
