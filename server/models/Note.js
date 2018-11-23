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
    ref: 'user'
  },
  image: {
    type: String,
    unique: true,
  },
};

const NoteSchema = new mongoose.Schema(schema);

export const Note = mongoose.model('Note', NoteSchema);
