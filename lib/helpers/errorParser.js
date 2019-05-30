"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var errorParser = function errorParser(errors) {
  var parsedError = [];

  try {
    if (Object.values(errors.errors).length > 0) {
      var errorKeys = Object.keys(errors.errors);
      errorKeys.forEach(function (key) {
        var errorObject = {
          location: 'body',
          param: errors.errors[key].path,
          value: '',
          msg: errors.errors[key].message
        };
        parsedError.push(errorObject);
      });
      return parsedError;
    }
  } catch (e) {
    return errors.message;
  }
};

var _default = errorParser;
exports["default"] = _default;