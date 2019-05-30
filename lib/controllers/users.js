"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _check = require("express-validator/check");

var _User = require("../models/User");

var _generateToken = _interopRequireDefault(require("../helpers/generateToken"));

// import mailer from '../helpers/mailer';
exports.register =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var errors, userExist, newUser, savedUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            errors = (0, _check.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(422).send({
              success: false,
              message: 'An error has occurred',
              errors: errors.array()
            }));

          case 4:
            _context.next = 6;
            return _User.User.findOne({
              email: req.body.email
            });

          case 6:
            userExist = _context.sent;

            if (userExist) {
              _context.next = 15;
              break;
            }

            newUser = new _User.User({
              username: req.body.username,
              password: req.body.password,
              fullname: req.body.fullname,
              email: req.body.email
            });
            _context.next = 11;
            return newUser.save();

          case 11:
            savedUser = _context.sent;

            if (savedUser) {
              res.status(201).json({
                success: true,
                message: 'User successful created',
                user: savedUser
              }); // Send an email to the user on successful registration mailer.sendMail(email, (err, info)
            }

            _context.next = 16;
            break;

          case 15:
            res.status(409).json({
              success: false,
              message: 'The email address you have entered is already associated with another account.'
            });

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context.t0)
            }));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var errors, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            errors = (0, _check.validationResult)(req);

            if (errors.isEmpty()) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(422).send({
              success: false,
              message: 'An error has occurred',
              errors: errors.array()
            }));

          case 4:
            _context2.next = 6;
            return _User.User.findOne({
              username: req.body.username
            }, {
              role: 0,
              email: 0
            });

          case 6:
            user = _context2.sent;

            if (!user) {
              res.status(404).send({
                success: false,
                message: 'Authentication failed. User not found.'
              });
            } else {
              user.comparePassword(req.body.password, function (err, isMatch) {
                if (!err && isMatch) {
                  var signature = {
                    username: user.username,
                    id: user._id
                  };
                  var token = (0, _generateToken["default"])(signature);
                  res.status(200).send({
                    success: true,
                    message: "".concat(user.username, ", You have successfully logged in."),
                    token: "".concat(token),
                    username: user.username
                  });
                } else {
                  res.status(401).send({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                  });
                }
              });
            }

            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context2.t0)
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.profile =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var id, profile;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.decoded.user.id;
            _context3.next = 4;
            return _User.User.findOne({
              _id: id
            }, {
              _id: 0,
              password: 0,
              __v: 0
            });

          case 4:
            profile = _context3.sent;

            if (!profile) {
              res.status(404).send({
                success: false,
                message: 'User details not found.'
              });
            } else {
              res.status(200).send({
                success: true,
                message: 'Your details have been retrieved.',
                profile: profile
              });
            }

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context3.t0)
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();