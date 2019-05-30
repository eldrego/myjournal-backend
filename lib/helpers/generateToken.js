"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _settings = _interopRequireDefault(require("../config/settings"));

var generateToken = function generateToken(signature) {
  var token = _jsonwebtoken["default"].sign({
    user: signature,
    iat: Math.floor(Date.now())
  }, _settings["default"].secret, {
    expiresIn: 60 * 60 * 1000
  });

  return token;
};

var _default = generateToken;
exports["default"] = _default;