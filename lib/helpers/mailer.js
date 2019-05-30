"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _mailerOptions = _interopRequireDefault(require("../config/mailerOptions"));

var mailer = _nodemailer["default"].createTransport(_mailerOptions["default"]); // return mailer;
// const mailer = () => {
//
//
//   // client.sendMail(email, (err, info) => {
//   //   if (err) {
//   //     res.status(500).json({
//   //       success: true,
//   //       message: 'An error has occured. Account created but verification email not sent',
//   //       err
//   //     });
//   //   } else {
//   //     // TODO: Modify the response from nodemail to display a user friendly message
//   //     res.status(201).json({
//   //       success: true,
//   //       message: 'User successful created verifcation email sent',
//   //       info
//   //     });
//   //   }
//   // });
// };


var _default = mailer;
exports["default"] = _default;