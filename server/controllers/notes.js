import { validationResult } from 'express-validator/check';
import { Note } from '../models/Note';
import { filterNotes } from '../helpers/query';
import errorParser from '../helpers/errorParser';

exports.message = (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
};

exports.getAll = (req, res) => {
  filterNotes(Note).sort({ createdAt: -1 })
    .then((items) => {
      res.send({
        success: true,
        message: 'success',
        notes: items,
      });
    })
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: 'An error has occurred',
        errors: `${error.message}`,

      });
    });
};

exports.getOne = (req, res) => {
  Note.findById(req.params.id)
    .then(item => res.send({
      success: true,
      message: 'success',
      item,
    }))
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: `${error.message}`,
      });
    });
};

exports.getUserNotes = (req, res) => {
  const { user } = req.decoded;
  Note.find({ author: user.id }).lean().then((items) => {
    res.send({
      success: true,
      message: 'success',
      notes: items,
    });
  }).catch((error) => {
    res.status(404).send({
      success: false,
      message: `${error.message}`,
    });
  });
};

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: 'An error has occurred',
      errors: errors.array(),
    });
  }

  const { user } = req.decoded;
  req.body.author = user.id;

  const newNote = new Note(req.body);
  newNote.save()
    .then((note) => {
      res.send({
        success: true,
        message: 'success',
        note,
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        message: 'An error has occured',
        errors: errorParser(error),
      });
    });
};

exports.delete = (req, res) => {
  Note.findById(req.params.id)
    .then(item => item.remove()
      .then(() => res.send({
        success: true,
        message: 'success',
        item,
      })))
    .catch((error) => {
      res.status(404).send({
        success: false,
        message: `${error.message}`,
      });
    });
};
