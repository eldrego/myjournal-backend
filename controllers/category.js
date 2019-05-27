import { Category } from '../models/Category';

exports.getAll = async (req, res) => {
  try {
    const categories = await Note.find({});
    if (categories) {
      res.status(200).json({
        success: true,
        message: 'success',
        categories,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'An error has occurred',
        errors: errors.array()
      });
    }

    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    if (savedCategory) {
      res.status(201).json({
        success: true,
        message: 'success',
        category: savedCategory,
      });
    }
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An error has occurred',
        error: `${error.message}`,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An error has occurred',
      error: `${error}`,
    });
  }
};
