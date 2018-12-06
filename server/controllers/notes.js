/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import { Note } from '../models/Note';

exports.message = (req, res) => {
  res.send({ message: 'Welcome to My Journal Application API' });
};

exports.getAll = (req, res) => {
  Note.find().then((items) => {
    res.send({
      success: true, message: 'success', notes: items
    });
  }).catch((error) => {
    res.status(404).send({
      success: false, message: 'failure', error
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
        message: 'failure',
        error: `${error} - Note not found`,
      });
    });
};

exports.getUserNotes = (req, res) => {
  const { user } = req.decoded;
  Note.find({ author: user.id }).then((items) => {
    res.send({
      success: true, message: 'success', notes: items
    });
  }).catch((error) => {
    res.status(404).send({
      success: false, message: 'failure', error
    });
  });
};

exports.create = (req, res) => {
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
        message: `Failure - ${error}`,
        error
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
        message: 'failure',
        error: `${error} - Note not found`,
      });
    });
};
