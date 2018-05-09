import csv from 'csvtojson';
import fs from 'fs';

export class Importer {
    constructor(event) {
        this.importEvent(event);
    }

    importEvent(event) {
        event.on('changed', (data) => {
            this.transformDataSync(data);
            this.transformDataAsync(data);
        });
    }

    transformDataSync(data) {
        for (const filename of data) {
            csv()
                .fromFile(filename)
                .on("end_parsed", (jsonObj) => {
                    console.log(jsonObj);
                    console.log('done')
                });
        }
    }

    transformDataAsync(data) {
        data.forEach(filename => {
            const stream = fs.createReadStream(filename);
            csv()
                .fromStream(stream)
                .on("json", function (jsonObj) { //single json object will be emitted for each csv line
                    console.log(jsonObj);
                })
        })
    }
} 
