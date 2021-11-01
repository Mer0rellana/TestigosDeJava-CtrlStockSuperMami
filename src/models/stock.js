const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const Schema = mongoose.Schema;

if (ENV === "dev") {
    mongoose.set('debug', true);
}

const collection = 'stocks'
const StockSchema = mongoose.model('stock', new Schema({
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
    },
    idItem: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    currentStock:{
        type: Number,
        required: true
    },
    failedStock:{
        type: Number,
        required: true
    },
    minStock:{
        type: Number,
        required: true
    },
    maxStock:{
        type: Number,
        required: true
    }
},
    { versionKey: false }
), collection)


module.exports = { StockSchema };