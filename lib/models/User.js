"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.schema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var schema = {
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    "default": 'regular'
  },
  verified: {
    type: Boolean,
    "default": false
  },
  imageUrl: {
    type: String,
    "default": 'http://lorempixel.com/100/100/people/'
  }
};
exports.schema = schema;
var UserSchema = new _mongoose["default"].Schema(schema, {
  timestamps: true
}); // eslint-disable-next-line

UserSchema.pre('save', function (next) {
  var user = this; // only hash the password if it has been modified (or is new)

  if (this.isModified('password') || this.isNew) {
    _bcryptNodejs["default"].genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      }

      _bcryptNodejs["default"].hash(user.password, salt, null, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
}); // eslint-disable-next-line

UserSchema.methods.comparePassword = function (userPassword, callback) {
  // eslint-disable-next-line
  _bcryptNodejs["default"].compare(userPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

var User = _mongoose["default"].model('User', UserSchema);

exports.User = User;