import Article from '../models/Article';

const articles = {
  getAll(req, res) {
    Article.find((err, articlesDocument) => {
      return res.send({
        articles: articlesDocument,
        message: 'success',
      });
    });
  },

  create(req, res) {
    const newArticle = new Article(req.body);
    newArticle.save()
      .then((article) => {
        res.send({
          article,
          message: 'success'
        });
      })
      .catch((error) => {
        res.status(400).send({
          error,
          message: 'failure'
        });
      });
  }
};

export default articles;
