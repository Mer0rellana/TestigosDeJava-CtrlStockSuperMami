
const {getArticuloSchema} = require('../../../models/articulo/articulo');

const getAllArticulo= async (req,res)=>{
  try {
    const articulos= await getArticuloSchema.find();
    res.send(articulos)
    
  } catch (error) {
    console.log(error)
  }

  /* res.render('index',{
    articulos
  }); */
};

module.exports = getAllArticulo;