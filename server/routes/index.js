import express from 'express';
import notes from '../controllers/notes';
import users from '../controllers/users';
import category from '../controllers/category';
import verifyToken from '../middlewares/verifyToken';
import validate from '../helpers/validate';

// const validate = new Validate();
const router = express.Router();

// Messages
router.get('/', (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
});
router.get('/message', notes.message);

// Authentication - done
router.post('/register', validate.register, users.register);
router.post('/login', validate.login, users.login);
router.get('/profile', verifyToken, users.profile);

// Notes
router.get('/notes', notes.getAll);
router.get('/user-notes', verifyToken, notes.getUserNotes);
router.get('/notes/:id', verifyToken, notes.getOne);
router.post('/notes', verifyToken, validate.createNote, notes.create);
router.delete('/notes/:id', verifyToken, notes.delete);
router.patch('/notes/:id', verifyToken, notes.update);

// Categories
router.get('/categories', verifyToken, category.getAll);
router.post('/categories', verifyToken, category.create);

// Default
router.get('/*', (req, res) => {
  res.send({ message: 'The endpoint you have initiated does not exist' });
});

module.exports = router;
