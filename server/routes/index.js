import express from 'express';
import notes from '../controllers/notes';
import users from '../controllers/users';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

// TODO: Split all these into separate files and have resource specific routes.

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
});

// Authentication
router.post('/register', users.register);
router.post('/login', users.login);

// Notes
router.get('/all-notes', verifyToken, notes.getAll);
router.get('/notes', verifyToken, notes.getUserNotes);
router.post('/notes', verifyToken, notes.create);

router.delete('/notes/:id', verifyToken, notes.delete);

// router.route('/notes')
//   .get(verifyToken, notes.getUserNotes)
//   .post(verifyToken, notes.create);
//
// router.route('/notes/:id')
//   .get(verifyToken, notes.getOne)
//   .put(verifyToken, notes.updateOne)
//   .delete(verifyToken, notes.delete);

router.get('/message', verifyToken, notes.message);

router.get('/*', (req, res) => {
  res.send({ message: 'The endpoint you have initiated does not exist' });
});

module.exports = router;
