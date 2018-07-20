import { MongoClient } from 'mongodb';

// const url = "mongodb://admin:123456@localhost:27017/node-db-mongo";
const url = "mongodb://localhost:27017";
const dbName = 'node-db-mongo';

MongoClient.connect(url, (err, db) => {
  if (err) {
    throw err;
  }
  // db.close();
});

// https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb
