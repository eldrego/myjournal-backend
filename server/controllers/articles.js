/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import Article from '../models/Article';

const articles = {
  getAll(req, res) {
    Article.find()
      .then((items) => {
        res.send({
          success: false,
          message: 'success',
          articles: items,
        });
      })
      .catch((error) => {
        res.status(404).send({
          success: false,
          message: 'failure',
          error,
        });
      });
  },

  create(req, res) {
    const newArticle = new Article(req.body);
    newArticle.save()
      .then((article) => {
        res.send({
          success: false,
          message: 'success',
          article,
        });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: 'failure',
          error
        });
      });
  },

  delete(req, res) {
    Article.findById(req.params.id)
      .then(item => item.remove()
        .then(() => res.send({
          success: false,
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
  }
};

export default articles;
