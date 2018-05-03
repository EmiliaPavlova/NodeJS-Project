import fs from 'fs';
import { join } from 'path';

export class DirWatcher {
    constructor(event, path, delay) {
        setInterval(async () => {
            const changes = await this.watch(path);
            if (changes.length > 0) {
                this.emitChange(event, changes);
            }
        }, delay);
    }

    watch(path) {
        let changedFiles = [];
        let data = [];
        // Promise
        const directory = this.readDirectory(path);
        console.log(directory);
        for (const file of directory) {
            const fileName = join(path, file);
            if (!this.changedFiles.find(name => name === fileName)) {
                this.changedFiles.push(fileName);
                this.data.push(file);
            }
          };

        console.log(changedFiles);
        return data;
    }

    readDirectory(path) {
        fs.readdir(path, (err, files) => {
            if (err) {
               console.log(err);
            }
            console.log('files', files);
            return files;
        });
    }

    emitChange(event, data) {
        event.emit('changed', data);
    }
}
