"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

_mongoose["default"].Promise = global.Promise;
var uri = _config["default"].db.uri;

_mongoose["default"].set('useCreateIndex', true);

_mongoose["default"].set('useFindAndModify', false);

_mongoose["default"].connect(uri, {
  useNewUrlParser: true
});

var database = _mongoose["default"].connection;
var _default = database;
exports["default"] = _default;