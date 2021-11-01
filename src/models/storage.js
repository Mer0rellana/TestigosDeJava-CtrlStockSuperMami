const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema =  new Schema({
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

const StorageSchema = new Schema({
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
        unique: true,
    },
    createdAt: Number,
    updatedAt: Number,
},
    { versionKey: false },
)

StorageSchema.set('collection', 'storages');

module.exports = mongoose.model('storage', StorageSchema);
