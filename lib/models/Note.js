"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Note = exports.schema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = {
  slug: {
    type: String
  },
  title: {
    type: String,
    required: [true, 'All notes should have a title']
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date
  },
  author: {
    type: _mongoose["default"].Schema.ObjectId,
    ref: 'User'
  },
  image: {
    type: String
  },
  category: {
    type: _mongoose["default"].Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide the identifier for the category in the database']
  }
};
exports.schema = schema;
var NoteSchema = new _mongoose["default"].Schema(schema);

var Note = _mongoose["default"].model('Note', NoteSchema);

exports.Note = Note;