/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import Article from '../models/Article';

exports.getAll = (req, res) => {
  Article.find().then((items) => {
    res.send({
      success: true, message: 'success', articles: items
    });
  }).catch((error) => {
    res.status(404).send({
      success: false, message: 'failure', error
    });
  });
};

exports.message = (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
};

exports.create = (req, res) => {
  const newArticle = new Article(req.body);
  newArticle.save()
    .then((article) => {
      res.send({
        success: true,
        message: 'success',
        article,
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        message: `Failure - ${error}`,
        error
      });
    });
};

exports.delete = (req, res) => {
  Article.findById(req.params.id)
    .then(item => item.remove()
      .then(() => res.send({
        success: true,
        message: 'success',
        item,
      })))
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: 'failure',
        error: `${error} - Article not found`,
      });
    });
};
