const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const Schema = mongoose.Schema;

if (ENV === "dev") {
  mongoose.set('debug', true);
}

const collection = 'items'
const ItemSchema = mongoose.model('item', new Schema({
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
  creationDate: {
    type: String,
    trim: true,
  },
  updateDate: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
},
  { versionKey: false }
), collection)


module.exports = { ItemSchema };