const { altaArticuloSchema } = require("../../../models/articulo/articulo");

const postArticulo=async (req,res)=>{
  const articulo= new altaArticuloSchema({
    ...req.body,
    estado:"activo",
    fechaCreacion:moment.now()
  });
  const err = articulo.validateSync();
        if (err) return res.status(400).send({ message: err.message })
  
  await articulo.save();
  res.send("Creado")
  //res.redirect('/');
};

module.exports = postArticulo;