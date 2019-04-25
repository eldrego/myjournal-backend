import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';
import path from 'path';

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
  preflightContinue: false
}));

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.static(`${__dirname}/../client/src/assets`));
app.use(express.static(`${__dirname}/./public`));

app.use('/api/v1/', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../client/dist/index.html`));
});

if (!module.parent) {
  app.server.listen(port);
  winston.info(`Started on port ${port}`, 'info');
}

module.exports = app;
