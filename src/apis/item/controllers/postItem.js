const { ItemSchema } = require("../../../models/item");
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');


const postItem = async (req, res) => {

  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {
      const item = new ItemSchema({
        ...req.body,
        state: "Activo",
        createdAt: moment.now()

      });
      const err = item.validateSync();
      if (err) return new ErrorModel().newBadRequest(err.message).send(res);
      await item.save();
      return res.status(200).send(item);
    }
    return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
    //res.redirect('/');
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = postItem;
