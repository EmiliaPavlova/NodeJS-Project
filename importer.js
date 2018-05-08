import csv from 'fast-csv';
import fs from 'fs';

export class Importer {
    constructor(event) {
        this.importEvent(event);
    }

    importEvent(event) {
        event.on('changed', (data) => {
            for (const file of data) {
                this.transformData(file);
            }
            this.transformDataAsync(data);
        });
    }

    transformData(filename) {
        const stream = fs.createReadStream(filename);
            const csvStream = csv()
                .on("data", (data) => {
                    console.log(data);
                })
                .on("end", () => {
                    console.log("done");
                });

            stream.pipe(csvStream);
    }

    transformDataAsync(data) {
        let promises = [];
        data.forEach((filename) => {
            const stream = fs.createReadStream(filename)
            const promise = new Promise((resolve, reject) => {
                const csvStream = csv()
                    .on("data", (data) => {
                        console.log(data);
                        resolve(data);
                    })
                    .on("end", () => {
                        console.log("done");
                    })
                    stream.pipe(csvStream);
                });

            promises.push(promise);
        })

        Promise.all(promises);
    }
}
