const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    available: {
        type: Boolean,
        required: true
    }
},
    { versionKey: false },
)

AreaSchema.set('collection', 'areas');

const collection = 'storages';
const StorageSchema = mongoose.model('storage', new Schema({
    id: {
        type: Number,
        required: true,
    },
    mts: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        enum: ['Bloqueado', 'Activo', 'Inactivo'],
        required: true,
    },
    area: {
        type: [AreaSchema],
        required: true,
    },
    createdAt: Number,
    updatedAt: Number,
    rows: Number,
    columns: Number
},
    { versionKey: false },
), collection)

module.exports = { StorageSchema };
