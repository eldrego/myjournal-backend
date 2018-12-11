import mongoose from 'mongoose';

export const schema = {
  name: {
    type: String,
    required: true,
    unique: true,
  }
};

const CategorySchema = new mongoose.Schema(schema);

export const Category = mongoose.model('Category', CategorySchema);
