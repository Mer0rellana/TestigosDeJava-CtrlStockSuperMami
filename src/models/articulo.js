const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const ArticuloSchema = new Squema({
  codigo:String,
  descripcion:String,
  familia:String,
  grupo:String,
  precio:Number,
  unidadMedida:String,
  cantidad:Number,
  fechaCreacion:String,
  fechaModificacion:String,

})

module.exports=mongoose.model('articulo',ArticuloSchema);