"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passportJwt = require("passport-jwt");

var _User = _interopRequireDefault(require("../models/User"));

var _secret = _interopRequireDefault(require("./secret"));

// load up the user model
var userPassport = function userPassport(passport) {
  var opts = {};
  opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeader();
  opts.secretOrKey = _secret["default"]; // disable underscore for jwt_payload
  // eslint-disable-next-line

  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    _User["default"].findOne({
      id: jwt_payload.id
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};

var _default = userPassport;
exports["default"] = _default;