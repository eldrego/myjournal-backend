import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import winston from 'winston';

import database from './config/database';
import routes from './routes';

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({ message: 'Root - Access endpoints using /api/v1' });
});

app.use('/api/v1/', routes);

app.server.listen(port, () => {
  console.log('server running now');
});

module.exports = app;
