import EventEmitter from 'events';
import fs from 'fs';
import csv from 'fast-csv';

export class Importer {
    importFiles(file = './data/books.csv') {
        const stream = fs.createReadStream(file);
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
