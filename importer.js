import csv from 'fast-csv';
import fs from 'fs';

export class Importer {
    constructor(event) {
        this.importEvent(event);
        this.importEventAsync(event);
    }

    importEvent(event) {
        event.on('changed', (data) => {
            this.transformData(data);
        });
    }

    importEventAsync(event) {
        const promise = new Promise((resolve, reject) => {
            event.on('changed', (data) => {
                resolve(this.transformData(data));
            });
        });

        return promise;
    }

    transformData(filename) {
        const stream = fs.createReadStream(filename);
            const csvStream = csv()
                .on("data", function(data){
                    console.log(data);
                })
                .on("end", function(){
                    console.log("done");
                });

            stream.pipe(csvStream);
    }
}
