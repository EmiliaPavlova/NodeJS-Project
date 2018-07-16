import express from 'express';
const server = express();
const PORT = 3000;
import pg from 'pg';
pg.connect('postgres://postgres:123456@localhost:5432/node-db-postgres');
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
server.get('/', (req, res) => res.status(200).send('hello **'));
