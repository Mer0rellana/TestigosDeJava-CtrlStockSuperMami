const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dni: {
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 8,
        trim: true,
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    tel : {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Operario almacén', 'Operario stock', 'Admin', 'Encargado stock', 'Gerencia'],
        required: true,
        trim: true,
    },
    state: {
        type: Boolean,
        default: true
    },
    createdAt: Number,
    updatedAt: Number,
},
    { versionKey: false }, 
);

UserSchema.set('collection', 'users');

module.exports = mongoose.model('user', UserSchema);