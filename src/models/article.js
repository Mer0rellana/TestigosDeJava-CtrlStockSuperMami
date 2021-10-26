const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const ArticleSchema = Schema({
  code: {
    type: Number,
    requied: true,
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
  createdAt: {
    type: String,
    required: true,
    trim: true,
  },

  updatedAt: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    enum: ['Activo', 'Eliminado ', 'Bloqueado'],
    trim: true,
  },

});