import mongoose from 'mongoose';
import config from './config';

const { db: { uri } } = config;

mongoose.connect(uri, { useNewUrlParser: true });
const database = mongoose.connection;

export default database;
