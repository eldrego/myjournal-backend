import express from 'express';
import articles from '../controllers/articles';
import users from '../controllers/users';


const router = express.Router();

router.get('/api/v1/', (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
});

// Authentication
router.post('/register', users.register);
router.post('/login', users.login);

// Articles
router.get('/articles', articles.getAll);
router.get('/message', articles.message);

// Articles with Authorization
router.post('/create', articles.create);
router.delete('/delete/:id', articles.delete);

module.exports = router;
