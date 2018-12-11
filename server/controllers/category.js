import { Category } from '../models/Category';

exports.getAll = (req, res) => {
  Category.find()
    .then((items) => {
      res.send({
        success: true, message: 'success', categories: items
      });
    })
    .catch((error) => {
      res.status(404).send({
        success: false, message: 'failure', error
      });
    });
};


exports.create = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save()
    .then((category) => {
      res.send({
        success: true,
        message: 'success',
        category,
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        message: `Failure - ${error}`
      });
    });
};
