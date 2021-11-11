const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const Schema = mongoose.Schema;

if (ENV === "dev") {
  mongoose.set('debug', true);
}

const ItemSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  family: {
    type: String,
    required: true,
    trim: true,
  },
  group: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  },
  createdAt: Number,
  updatedAt: Number,
  state: {
    type: String,
    enum: ['Activo', 'Eliminado '],
    trim: true,
  },
  entry: {
    type: Number,
    default: 0
  },
  exit: {
    type: Number,
    default: 0
  },
},
  { versionKey: false }
);

ItemSchema.set('collection', 'items');

module.exports = mongoose.model('item', ItemSchema);