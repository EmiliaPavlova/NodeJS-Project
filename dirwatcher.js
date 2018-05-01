// export class DirWatcher {
// }

const fs = require('fs');

// fs.readFile('./data/users.json', 'utf-8', (err, data) => {
//     const users = JSON.parse(data);
//     console.log(users.users);
// });


fs.watch('./data', (eventType, filename) => {
    console.log(`event type is: ${eventType}`);
    if (filename) {
        console.log(`filename provided: ${filename}`);
    } else {
        console.log('filename not provided');
    }
});