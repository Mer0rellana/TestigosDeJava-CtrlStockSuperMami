const { getArticuloSchema } = require("../../../models/articulo/articulo");

const getById = async (req, res) => {
  const { id } = req.params;
  const articulo = await getArticuloSchema.findById(id);
  res.send(articulo)
  /* res.render('index',{
    articulo
  }); */
};


const getArticuloBy = async (req, res) => {
  const { estado } = req.params;
  /* getArticuloSchema.find({estado})
  .then((data)=>res.send(data)) */
  const articulo = await getArticuloSchema.find({estado})
  res.send(articulo)

  /* res.render('index',{
    articulos
  }); */
};

module.exports = { getById, getArticuloBy };