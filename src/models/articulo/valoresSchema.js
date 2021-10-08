const valoresSchema = {
  codigoSchema: {
    type: String
  },
  descripcionSchema: {
    type: String
  },
  familiaSchema: {
    type: String
  },
  grupoSchema: {
    type: String
  },
  precioSchema: {
    type: Number,
    min: 0
  },
  unidadMedidaSchema: {
    type: String
  },
  cantidadSchema: {
    type: Number,
    min: 1
  },
  fechaCreacionSchema: {
    type: Number
  },
  fechaModificacionSchema: {
    type: Number
  },
  estadoSchema: {
    type: String
  },
};

module.exports = valoresSchema;