import express from 'express';
import articles from '../controllers/articles';
import users from '../controllers/users';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/api/v1/', (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
});

// Authentication
router.post('/register', users.register);
router.post('/login', users.login);

// Articles
router.get('/articles', verifyToken, articles.getAll);
router.get('/message', verifyToken, articles.message);

// Articles with Authorization
router.post('/create', verifyToken, articles.create);
router.delete('/delete/:id', verifyToken, articles.delete);

module.exports = router;
