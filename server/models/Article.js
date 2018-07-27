import mongoose from 'mongoose';

const ArticlesSchema = new mongoose.Schema({
  slug: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  tagList: {
    type: Array,
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
    type: String,
  }
});
mongoose.model('Articles', ArticlesSchema);

module.exports = mongoose.model('Articles');
