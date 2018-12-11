import { check } from 'express-validator/check';

/**
 * [validate description]
 * @type {Object}
 */
const validate = {
  register: [
    check('fullname')
      .not().isEmpty()
      .withMessage('Please provide your fullname'),
    check('username')
      .not().isEmpty()
      .withMessage('Please provide your username'),
    check('email')
      .isEmail()
      .withMessage('Please provide a valid email address'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password cannot be shorter than 8 charaters')
  ],
  login: [
    check('username').not().isEmpty()
      .withMessage('Please provide your username'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password cannot be shorter than 8 charaters')
  ],
  createNote: [
    check('title').not().isEmpty()
      .withMessage('Please enter a valid not title'),
    check('content').not().isEmpty()
      .withMessage('Please a content for this note'),
    check('category')
      .not().isEmpty()
      .withMessage('Please provide the identifier for the category in the database')
  ]
};

export default validate;
