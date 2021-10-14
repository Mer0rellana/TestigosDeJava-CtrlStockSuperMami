const { ItemSchema: Item } = require("../../../models/item");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");

const ItemUpdateState = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {
      const fecha = Moment.now();
      const { id } = req.params;
      await Item.updateOne({ code: id }, { $set: { state: "Eliminado",  updatedAt: fecha} });
      return res.status(200).send({ message: "Artículo eliminado con éxito" });
    } else {
      return new ErrorModel()
        .newUnauthorized("Usuario no autorizado")
        .send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = ItemUpdateState;
