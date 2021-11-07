const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const Schema = mongoose.Schema;

if (ENV === "dev") {
    mongoose.set('debug', true);
}

const collection = 'stocks'
const StockSchema = mongoose.model('stock', new Schema({
    createdAt: Number,
    updatedAt: Number,
    idItem: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    currentStock: {
        type: Number,
        required: true
    },
    failedStock: {
        type: Number,
        required: true
    },
    minStock: {
        type: Number,
        required: true
    },
    maxStock: {
        type: Number,
        required: true
    },
    adjusted: {
        type: Boolean,
        default: false
    }
},
    { versionKey: false }
), collection)


module.exports = { StockSchema };