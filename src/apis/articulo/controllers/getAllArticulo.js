
const {getArticuloSchema} = require('../../../models/articulo/articulo');

const getAllArticulo= async (req,res)=>{
  const articulos= await getArticuloSchema.find();
  res.send(articulos)

  /* res.render('index',{
    articulos
  }); */
};

module.exports = getAllArticulo;