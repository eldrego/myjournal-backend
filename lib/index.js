"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _winston = _interopRequireDefault(require("winston"));

var _database = _interopRequireDefault(require("./config/database"));

var _routes = _interopRequireDefault(require("./routes"));

require('dotenv').config();

var port = process.env.PORT || 8080;
var app = (0, _express["default"])();
app.server = _http["default"].createServer(app);
app.use((0, _cors["default"])({
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}));
app.use(_bodyParser["default"].json({
  extended: false
}));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"]("".concat(__dirname, "/../client/dist")));
app.use(_express["default"]["static"]("".concat(__dirname, "/../client/src/assets")));
app.use(_express["default"]["static"]("".concat(__dirname, "/./public")));
app.get('/', function (req, res) {
  res.send({
    message: 'Root - Access endpoints using /api/v1'
  });
});
app.use('/api/v1/', _routes["default"]);

if (!module.parent) {
  app.server.listen(port);

  _winston["default"].info("Started on port ".concat(port), 'info');
}

module.exports = app;