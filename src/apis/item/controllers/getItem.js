const { ItemSchema } = require("../../../models/item");
const ErrorModel = require('../../../models/api-error');

const getAllItems = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {
      const { state, code } = req.query;
      if (!state && !code) {
        //getAll
        const items = await ItemSchema.find();
        return res.status(200).send(items);
        
      } else if (code) {
        //get por code
        const item = await ItemSchema.find({code});
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

module.exports = getAllItems;