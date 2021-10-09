const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuario = new Schema ({
    legajo : String,
    nombre : String,
    dni : Number,
    mail : String,
    telefono : Number,
    contraseña : String,
    rol : String,
    permisos : [String],
    createdAt : Date,
    updatedAt : Date
});

export default usuario;