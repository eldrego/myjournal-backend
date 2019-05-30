"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require('dotenv').config();

var _default = {
  secret: process.env.JWT_SECRET || 'yourSecretCode'
};
exports["default"] = _default;