const mongoose = require('mongoose');
const { ENV } = require('../config/config');
const { ItemSchema } = require('./item');
const Schema = mongoose.Schema;

if (ENV === "dev") {
    mongoose.set('debug', true);
}

const collection = 'inventories'
const InventorySchema = mongoose.model('inventory', new Schema({
    idUser: {
        type: Number,
        required: true,
    },
    idStorage: {
        type: Number,
        required: true
    },
    observation: {
        type: String,
        required: true,
        trim: true,
        max: 1500  
    },
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
    },
    adjusted: {
        type: Boolean,
        default: false
    },
    idItem: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['Bloqueado', 'Activo', 'Inactivo'],
        required: true,
    },
    realStock:{
        type: Number,
        required: true
    },
    failedRealStock:{
        type: Number,
        required: true
    }
},
    { versionKey: false }
), collection)


module.exports = { InventorySchema };