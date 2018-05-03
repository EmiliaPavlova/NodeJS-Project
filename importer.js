import csv from 'fast-csv';

export class Importer {
    constructor(event) {
        this.handleOnChangeEvent(event);
    }

    handleOnChangeEvent(event) {
        event.on('changed', (data) => {
            console.log(event);
            const result = this.this.transformData(data);
            console.log(result);
        })
    }

    transformData(filename) {
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
