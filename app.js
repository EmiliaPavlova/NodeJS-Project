import http from 'http';
import config from './config/app';
import routes from './routes/routers';
import express from 'express';

import cookieParser from './middlewares/cookie-parser-middleware';
import queryParser from './middlewares/query-string-parser-middleware';
import bodyParser from 'body-parser';
import routers from './routes/routers';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/node-db-mongo');

const app = express();

const data = [{
  id: 1,
  username: 'admin',
  password: '123456',
}];

require('./auth/passport')(app, data);

app.use(cookieParser);
app.use(queryParser);
app.use(bodyParser.json());

app.use((req, res, next) => {
  next();
});

require('./routes/routers')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log(config.name);

export default app;