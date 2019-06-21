import { validationResult } from 'express-validator/check';
import { Note } from '../models/Note';

exports.getAll = async (req, res) => {
  try {
    const { user } = req.decoded;
    const notes = await Note.find({
      author: user.id
    })
      .populate('category', 'name')
      .populate('author', 'username')
      .lean();
    if (notes) {
      res.status(200).json({
        success: true,
        message: 'success',
        notes,
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

exports.getOne = async (req, res) => {
  try {
    const { user: { id } } = req.decoded;
    const note = await Note.findOne({
      _id: req.params.id,
      author: id
    });

    if (note) {
      res.status(200).json({
        success: true,
        message: 'success',
        note
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Record not found',
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

exports.getUserNotes = async (req, res) => {
  try {
    const { user } = req.decoded;
    const notes = await Note.find({
      author: user.id
    }).lean();

    if (notes) {
      res.status(200).json({
        success: true,
        message: 'success',
        notes,
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

    const { user } = req.decoded;
    req.body.author = user.id;

    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    if (savedNote) {
      res.status(201).json({
        success: true,
        message: 'success',
        note: savedNote,
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

exports.update = async (req, res) => {
  try {
    const { user: { id } } = req.decoded;
    const updatedNote = await Note.findOneAndUpdate({
      _id: req.params.id,
      author: id
    }, req.body, { new: true });

    if (updatedNote) {
      res.status(200).json({
        success: true,
        message: 'Success',
        note: updatedNote
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

exports.delete = async (req, res) => {
  try {
    const { user: { id } } = req.decoded;
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      author: id
    });

    if (note) {
      res.status(204).json({
        success: true,
        message: 'Note successfully deleted',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `${error.message}`,
    });
  }
};
