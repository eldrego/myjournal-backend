"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = exports.schema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = {
  name: {
    type: String,
    required: true,
    unique: true
  }
};
exports.schema = schema;
var CategorySchema = new _mongoose["default"].Schema(schema);

var Category = _mongoose["default"].model('Category', CategorySchema);

exports.Category = Category;