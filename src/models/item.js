const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const Schema = mongoose.Schema;

if (ENV === "dev") {
  mongoose.set('debug', true);
}

<<<<<<< HEAD
const collection = 'item'
const ItemSchema = mongoose.model('item', new Schema({
  code: {
    type: Number,
=======
const collection = 'items'
const ItemSchema = mongoose.model('item', new Schema({
  code: {
    type: String,
>>>>>>> 95a973e108bfb9c17b6f2cb8a64ea50807c3aae4
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
<<<<<<< HEAD
  creationDate: {
    type: String,
    trim: true,
  },
  updateDate: {
=======
  createdAt: {
    type: String,
    trim: true,
  },
  updatedAt: {
>>>>>>> 95a973e108bfb9c17b6f2cb8a64ea50807c3aae4
    type: String,
    trim: true,
  },
  state: {
    type: String,
<<<<<<< HEAD
    enum: ['Activo','Eliminado','Bloqueado'],
=======
    enum: ['Activo', 'Eliminado ', 'Bloqueado'],
>>>>>>> 95a973e108bfb9c17b6f2cb8a64ea50807c3aae4
    trim: true,
  },
},
  { versionKey: false }
), collection)


module.exports = { ItemSchema };