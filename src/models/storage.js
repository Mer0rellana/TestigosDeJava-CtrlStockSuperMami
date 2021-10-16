const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const AreaSchema = new Schema({
    id:{
      type:String,
      required:true,
      unique:true
    },
    available:{
      type:Boolean,
      required:true
    }
},
    { versionKey: false },
)

AreaSchema.set('collection', 'area');

const StorageSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    mts: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    state: {
        type: String,
        enum: ['Bloqueado', 'Activo', 'Inactivo'],
        required: true,
        trim: true,
    },
    area: {
        type: [AreaSchema],
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: Number,
    updatedAt: Number,
},
    { versionKey: false },
)


StorageSchema.set('collection', 'storage');

module.exports = mongoose.model('storage', StorageSchema);