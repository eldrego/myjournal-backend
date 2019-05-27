import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';

import database from './config/database';
import routes from './routes';

require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.server = http.createServer(app);

app.use(cors({
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}));

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.static(`${__dirname}/../client/src/assets`));
app.use(express.static(`${__dirname}/./public`));

app.get('/', (req, res) => {
  res.send({ message: 'Root - Access endpoints using /api/v1' });
});

app.use('/api/v1/', routes);

if (!module.parent) {
  app.server.listen(port);
  winston.info(`Started on port ${port}`, 'info');
}

module.exports = app;
