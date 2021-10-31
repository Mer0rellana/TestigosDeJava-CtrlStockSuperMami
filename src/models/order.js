const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsOrderSchema =  new Schema({
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
},
    { versionKey: false },
)

ItemsOrderSchema.set('collection', 'itemsOrder');

const OrderSchema = new Schema({
    createdAt: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        trim: true,
        enum: ['Pendiente', 'Anulado', 'Remitido'],
        default: 'Pendiente'
    },
    deliveryDate: {
        type: Number,
        required: true,
    },
    updatedAt: Number,
    items:  {
        type: [ItemsOrderSchema],
        required: true,
    }
},
    { versionKey: false }, 
);

OrderSchema.set('collection', 'orders');

module.exports = mongoose.model('order', OrderSchema);