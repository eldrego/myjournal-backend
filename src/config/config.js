require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' or 'test' or 'prod'

const dev = { db: { uri: process.env.DEV_DB } };
const test = { db: { uri: process.env.TEST_DB } };
const prod = { db: { uri: process.env.PROD_DB } };

const config = {
  dev,
  test,
  prod
};

module.exports = config[env];
