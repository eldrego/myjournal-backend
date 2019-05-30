"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _check = require("express-validator/check");

var _Note = require("../models/Note");

exports.getAll =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var notes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Note.Note.find({}).lean();

          case 3:
            notes = _context.sent;

            if (notes) {
              res.status(200).json({
                success: true,
                message: 'success',
                notes: notes
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context.t0)
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getOne =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var id, note;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.decoded.user.id;
            _context2.next = 4;
            return _Note.Note.findOne({
              _id: req.params.id,
              author: id
            });

          case 4:
            note = _context2.sent;

            if (note) {
              res.status(200).json({
                success: true,
                message: 'success',
                note: note
              });
            } else {
              res.status(404).json({
                success: false,
                message: 'Record not found'
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context2.t0)
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserNotes =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var user, notes;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = req.decoded.user;
            _context3.next = 4;
            return _Note.Note.find({
              author: user.id
            }).lean();

          case 4:
            notes = _context3.sent;

            if (notes) {
              res.status(200).json({
                success: true,
                message: 'success',
                notes: notes
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

exports.create =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var errors, user, newNote, savedNote;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            errors = (0, _check.validationResult)(req);

            if (errors.isEmpty()) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", res.status(422).json({
              success: false,
              message: 'An error has occurred',
              errors: errors.array()
            }));

          case 4:
            user = req.decoded.user;
            req.body.author = user.id;
            newNote = new _Note.Note(req.body);
            _context4.next = 9;
            return newNote.save();

          case 9:
            savedNote = _context4.sent;

            if (savedNote) {
              res.status(201).json({
                success: true,
                message: 'success',
                note: savedNote
              });
            }

            _context4.next = 18;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);

            if (!(_context4.t0.name === 'MongoError' && _context4.t0.code === 11000)) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(409).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context4.t0.message)
            }));

          case 17:
            return _context4.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context4.t0)
            }));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.update =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var id, updatedNote;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.decoded.user.id;
            _context5.next = 4;
            return _Note.Note.findOneAndUpdate({
              _id: req.params.id,
              author: id
            }, req.body, {
              "new": true
            });

          case 4:
            updatedNote = _context5.sent;

            if (updatedNote) {
              res.status(200).json({
                success: true,
                message: 'Success',
                note: updatedNote
              });
            }

            _context5.next = 13;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);

            if (!(_context5.t0.name === 'MongoError' && _context5.t0.code === 11000)) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(409).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context5.t0.message)
            }));

          case 12:
            return _context5.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context5.t0)
            }));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports["delete"] =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var id, note;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.decoded.user.id;
            _context6.next = 4;
            return _Note.Note.findOneAndDelete({
              _id: req.params.id,
              author: id
            });

          case 4:
            note = _context6.sent;

            if (note) {
              res.status(204).json({
                success: true,
                message: 'Note successfully deleted'
              });
            } else {
              res.status(404).json({
                success: false,
                message: 'Record not found'
              });
            }

            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            res.status(404).send({
              success: false,
              message: "".concat(_context6.t0.message)
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();