import mongoose from 'mongoose';

export const schema = {
  slug: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'All notes should have a title'],
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  image: {
    type: String
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide the identifier for the category in the database'],

  }
};

const NoteSchema = new mongoose.Schema(schema);

export const Note = mongoose.model('Note', NoteSchema);
