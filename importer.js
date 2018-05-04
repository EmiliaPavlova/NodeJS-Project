import csv from 'fast-csv';
import fs from 'fs';

export class Importer {
    constructor(event) {
        this.handleOnChangeEvent(event);
    }

    handleOnChangeEvent(event) {
        event.on('changed', (data) => {
            console.log(event);
            const result = this.transformData(data);
            console.log(result);
        })
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
