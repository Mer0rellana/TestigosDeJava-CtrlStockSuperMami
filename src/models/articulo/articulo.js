const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = 'articulos'


const valoresSchema = require('./valoresSchema');
/* const codigoSchema = {
  type: String
};
const descripcionSchema = {
  type: String
};
const familiaSchema = {
  type: String
};
const grupoSchema = {
  type: String
};
const precioSchema = {
  type: Number,
  min: 0
};
const unidadMedidaSchema = {
  type: String
};
const cantidadSchema = {
  type: Number,
  min: 1
};
const fechaCreacionSchema = {
  type: Number
};
const fechaModificacionSchema = {
  type: Number
};
const estadoSchema = {
  type: String
}; */


const altaArticuloSchema = mongoose.model('altaArticulo', new Schema({
  codigo: {
    ...valoresSchema.codigoSchema,
    required: true
  },
  descripcion: {
    ...valoresSchema.descripcionSchema,
    required: true
  },
  familia: {
    ...valoresSchema.familiaSchema,
    required: true
  },
  grupo: {
    ...valoresSchema.grupoSchema,
    required: true
  },
  precio: {
    ...valoresSchema.precioSchema,
    required: true
  },
  unidadMedida: {
    ...valoresSchema.unidadMedidaSchema,
    required: true
  },
  cantidad: {
    ...valoresSchema.cantidadSchema,
    required: true
  },
  fechaCreacion: {
    ...valoresSchema.fechaCreacionSchema
  },
  estado: { ...valoresSchema.estadoSchema },
},
  { versionKey: false }
), collection)

const getArticuloSchema = mongoose.model('getArticulo', new Schema({
},
  { versionKey: false }
), collection)


module.exports = { altaArticuloSchema, getArticuloSchema };