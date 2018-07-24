import { MongoClient } from 'mongodb';

// const connectionString = "mongodb://admin:123456@localhost:27017/node-db-mongo";
const connectionString = "mongodb://localhost:27017/node-db-mongo";

const db = MongoClient.connect(connectionString);
console.log(db);

module.exports = db;
