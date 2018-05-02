import fs from 'fs';

export class DirWatcher {
    watch(path = './data', delay) {
        fs.watch(path, (eventType, filename) => {
            console.log(`event type is: ${eventType}`);
            if (filename) {
                console.log(`changed file: ${eventType} ${filename}`);
            } else {
                console.log('filename not provided');
            }
        });
    }
}
