"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterNote = exports.filterNotes = void 0;

var filterNotes = function filterNotes(model) {
  return model.aggregate([{
    $lookup: {
      from: 'categories',
      localField: 'category',
      foreignField: '_id',
      as: 'category'
    }
  }, {
    $project: {
      category: {
        __v: 0
      }
    }
  }, {
    $unwind: '$category'
  }, {
    $lookup: {
      from: 'users',
      localField: 'author',
      foreignField: '_id',
      as: 'author'
    }
  }, {
    $unwind: '$author'
  }, {
    $project: {
      author: {
        _id: 0,
        __v: 0,
        role: 0,
        verified: 0,
        imageUrl: 0,
        username: 0,
        password: 0,
        email: 0
      },
      __v: 0
    }
  }]);
};

exports.filterNotes = filterNotes;

var filterNote = function filterNote(model) {
  console.log(model);
};

exports.filterNote = filterNote;