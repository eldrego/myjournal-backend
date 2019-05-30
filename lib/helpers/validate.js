"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

/**
 * [validate description]
 * @type {Object}
 */
var validate = {
  register: [(0, _check.check)('fullname').not().isEmpty().withMessage('Please provide your fullname'), (0, _check.check)('username').not().isEmpty().withMessage('Please provide your username'), (0, _check.check)('email').isEmail().withMessage('Please provide a valid email address'), (0, _check.check)('password').isLength({
    min: 8
  }).withMessage('Password cannot be shorter than 8 charaters')],
  login: [(0, _check.check)('username').not().isEmpty().withMessage('Please provide your username'), (0, _check.check)('password').isLength({
    min: 8
  }).withMessage('Password cannot be shorter than 8 charaters')],
  createNote: [(0, _check.check)('title').not().isEmpty().withMessage('Please enter a valid not title'), (0, _check.check)('content').not().isEmpty().withMessage('Please a content for this note'), (0, _check.check)('category').not().isEmpty().withMessage('Please provide the identifier for the category in the database')] // updateNote: [
  //   check('title').not().isEmpty()
  //     .withMessage('Please enter a valid not title'),
  //   check('content').not().isEmpty()
  //     .withMessage('Please a content for this note'),
  //   check('category')
  //     .not().isEmpty()
  //     .withMessage('Please provide the identifier for the category in the database')
  // ]

};
var _default = validate;
exports["default"] = _default;