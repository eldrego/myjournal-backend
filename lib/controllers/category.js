"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Category = require("../models/Category");

exports.getAll =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var categories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Note.find({});

          case 3:
            categories = _context.sent;

            if (categories) {
              res.status(200).json({
                success: true,
                message: 'success',
                categories: categories
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

exports.create =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var errors, newCategory, savedCategory;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              success: false,
              message: 'An error has occurred',
              errors: errors.array()
            }));

          case 4:
            newCategory = new _Category.Category(req.body);
            _context2.next = 7;
            return newCategory.save();

          case 7:
            savedCategory = _context2.sent;

            if (savedCategory) {
              res.status(201).json({
                success: true,
                message: 'success',
                category: savedCategory
              });
            }

            _context2.next = 16;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);

            if (!(_context2.t0.name === 'MongoError' && _context2.t0.code === 11000)) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", res.status(409).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context2.t0.message)
            }));

          case 15:
            return _context2.abrupt("return", res.status(500).json({
              success: false,
              message: 'An error has occurred',
              error: "".concat(_context2.t0)
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();