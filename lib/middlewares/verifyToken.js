"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _settings = _interopRequireDefault(require("../config/settings"));

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization;

  if (typeof token !== 'undefined') {
    _jsonwebtoken["default"].verify(token, _settings["default"].secret, function (error, decoded) {
      if (!error) {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      } else {
        return res.send({
          success: false,
          message: "Failed to authenticate token. - ".concat(error),
          token: token
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

var _default = verifyToken;
exports["default"] = _default;