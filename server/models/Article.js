import mongoose from 'mongoose';

const ArticlesSchema = new mongoose.Schema({
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
  tagList: {
    type: Array,
  },
  content: {
    type: String,
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
