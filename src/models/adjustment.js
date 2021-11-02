const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const Schema = mongoose.Schema;

if (ENV === "dev") {
    mongoose.set('debug', true);
}

const collection = 'adjustments'
const AdjustmentSchema = mongoose.model('adjustment', new Schema({
    idUser: {
        type: Number,
        required: true,
    },
    idInventory: {
        type: String,
        required: true,
    },
    idStock: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    systemStock:{
        type: Number,
        required: true
    },
    realStock:{
        type: Number,
        required: true
    },
    failedSystemStock:{
        type: Number,
        required: true
    },
    failedRealStock:{
        type: Number,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
    state: {
        type: String,
        enum: ['Activo', 'Eliminado '],
        trim: true,
        default: 'Activo'
    },
},
    { versionKey: false }
), collection)


module.exports = { AdjustmentSchema };