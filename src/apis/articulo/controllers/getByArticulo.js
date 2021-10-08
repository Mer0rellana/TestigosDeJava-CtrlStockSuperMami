const getById=async (req,res)=>{
  const {id} = req.params;
  const articulo = await getArticuloSchema.findById(id);
  res.send("Recibido")
  /* res.render('index',{
    articulo
  }); */
};

module.exports= getById;