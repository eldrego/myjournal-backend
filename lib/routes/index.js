"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _notes = _interopRequireDefault(require("../controllers/notes"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _category = _interopRequireDefault(require("../controllers/category"));

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

var _validate = _interopRequireDefault(require("../helpers/validate"));

// const validate = new Validate();
var router = _express["default"].Router(); // Messages


router.get('/', function (req, res) {
  res.send({
    message: 'Welcome to My Journal Application API'
  });
}); // Authentication - done

router.post('/register', _validate["default"].register, _users["default"].register);
router.post('/login', _validate["default"].login, _users["default"].login);
router.get('/profile', _verifyToken["default"], _users["default"].profile); // Notes

router.get('/notes', _notes["default"].getAll);
router.get('/user-notes', _verifyToken["default"], _notes["default"].getUserNotes);
router.get('/notes/:id', _verifyToken["default"], _notes["default"].getOne);
router.post('/notes', _verifyToken["default"], _validate["default"].createNote, _notes["default"].create);
router["delete"]('/notes/:id', _verifyToken["default"], _notes["default"]["delete"]);
router.patch('/notes/:id', _verifyToken["default"], _notes["default"].update); // Categories

router.get('/categories', _verifyToken["default"], _category["default"].getAll);
router.post('/categories', _verifyToken["default"], _category["default"].create); // Default

router.get('/*', function (req, res) {
  res.send({
    message: 'The endpoint you have initiated does not exist'
  });
});
module.exports = router;