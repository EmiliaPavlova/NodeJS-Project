import fs from 'fs';
import { join } from 'path';

export class DirWatcher {
    constructor(event, path, delay) {
        setInterval(async () => {
            const changes = await this.watch(path);
            if (changes.length > 0) {
                for (const file of changes) {
                    this.emitChange(event, file);
                }
            }
        }, delay);
        this.changedFiles = [];
    }
    
    async watch(path) {
        let data = [];
        let directory = await this.readDirectory(path);
        for (const file of directory) {
            const fileName = join(path, file);
            if (!this.changedFiles.find(name => name === fileName)) {
                this.changedFiles.push(fileName);
                data.push(fileName);
            }
        };
        return data;
    }

    readDirectory(path) {
        const promise  =  new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject('err: ', err);
                }
                resolve(files);
            });
        });

        return promise;
    }

    emitChange(event, data) {
        console.log('changed: ', data);
        event.emit('changed', data);
    }
}
