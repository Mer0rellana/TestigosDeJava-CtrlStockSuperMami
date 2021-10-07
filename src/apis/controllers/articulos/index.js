const express = require('express');
const router = express.Router();

const Articulo = require('../../../models/articulo');

router.get('/',(req,res)=>{
  const articulos= await Articulo.find();
  //console.log(articulos);

  res.render('index',{
    articulos
  });
});

router.get('/:id',async (req,res)=>{
  const {id} = req.params;
  const articulo = await Articulo.findById(id);
  res.render('index',{
    articulo
  });
});

router.post('/add',async (req,res)=>{
  const articulo= new Articulo(req.body);
  await articulo.save();
  res.redirect('/');
})

module.exports=router;
