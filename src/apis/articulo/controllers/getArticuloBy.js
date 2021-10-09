const { getArticuloSchema } = require("../../../models/articulo/articulo");

const getById = async (req, res) => {
  const { id } = req.params;
  const articulo = await getArticuloSchema.findById(id);
  res.send(articulo)
  /* res.render('index',{
    articulo
  }); */
};


const getArticuloBy = (req, res) => {
  const { estado } = req.params;
  getArticuloSchema.find({estado})
  .then((data)=>res.send(data))
  

  /* res.render('index',{
    articulos
  }); */
};

module.exports = { getById, getArticuloBy };