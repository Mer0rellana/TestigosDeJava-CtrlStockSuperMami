const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const Schema = mongoose.Schema;

if (ENV === "dev") {
    mongoose.set('debug', true);
}

const collection = 'inventories'
const StockSchema = mongoose.model('inventory', new Schema({
    createdAt: {
        type: String,
        trim: true,
    },
    updatedAt: {
        type: String,
        trim: true,
    },
    idItem: {
        type: Number,
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