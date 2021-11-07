const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['Entrada', 'Salida'],
    },
    idUser: {
        type: Number,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
        enum: ['Anulado', 'Activo'],
        default: 'Activo'
    },
    anulatedReason: {
        type: String,
        trim: true,
        max: 1500  
    },
    createdAt: Number,
    updatedAt: Number,
    batches:  {
        type: [ String ],
        required: true,
    },
    userId: Number, 
},
    { versionKey: false }, 
);

TransactionSchema.set('collection', 'transactions');

module.exports = mongoose.model('transaction', TransactionSchema);

