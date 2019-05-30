"use strict";

require('dotenv').config();

var env = process.env.NODE_ENV; // 'dev' or 'test' or 'prod'

var dev = {
  db: {
    uri: process.env.DEV_DB
  }
};
var test = {
  db: {
    uri: process.env.TEST_DB
  }
};
var prod = {
  db: {
    uri: process.env.PROD_DB
  }
};
var config = {
  dev: dev,
  test: test,
  prod: prod
};
module.exports = config[env];