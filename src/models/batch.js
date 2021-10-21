const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    codeItem: {
        type: String,
        required: true,
        trim: true,
    },
    descriptionItem: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
        enum: ['Ingresado', 'Almacenado','Egresado'],
        required: true,
    },
    idStorage: Number,
    idArea : String,
    amount: {
        type: Number,
        trim: true,
        required: true,
    },
    failed: {
        type: Boolean,
        default: false
    },
    createdAt: Number,
    updatedAt: Number,
    expiredAt: Number,
},
    { versionKey: false }, 
);

BatchSchema.set('collection', 'batches');

module.exports = mongoose.model('batch', BatchSchema);