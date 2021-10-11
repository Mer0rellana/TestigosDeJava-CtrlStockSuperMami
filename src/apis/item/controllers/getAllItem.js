const { ItemSchema } = require("../../../models/item");
const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const { query } = require("express");

const getAllItems = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {
      const { state, id } = req.query;
      if (!state && !id) {
        //getAll
        const items = await ItemSchema.find();
        return res.status(200).send(items);
        
      } else if (id) {
        //get por id
        const item = await ItemSchema.findById(id);
        return res.status(200).send(item);

      }else if(state){
        //get por estado
        const item = await ItemSchema.find({ state });
        return res.status(200).send(item);
      }
    };

    return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);

  }

  /* res.render('index',{
    items
  }); */
};

const getItemById = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {
      const { id } = req.params;
      const item = await ItemSchema.findById(id);
      if (!item) return new ErrorModel().newNotFound("No un articulo con ese id").send(res);
      return res.status(200).send(item);
    };


    return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }

  /* res.render('index',{
    articulo
  }); */

};


const getItemByState = async (req, res) => {
  /* getArticuloSchema.find({estado})
  .then((data)=>res.send(data)) */
  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {

    };
    return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);

  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
  /* res.render('index',{
    articulos
  }); */
};

module.exports = getAllItems;