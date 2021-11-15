const { ItemSchema: Item } = require("../../../models/item");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");

const ItemUpdateState = async (req, res) => {
  try {
    const token = res.locals.payload;
    const fecha = Moment.now();
    const { id } = req.params;

    if (token.role === "Admin" || token.role === "Operario stock" || token.role === "Encargado stock" ) {
      const doc = await Item.updateOne(
        { code: id },
        { $set: { state: "Eliminado", updatedAt: fecha } });
      if (doc.matchedCount === 0) return new ErrorModel().newNotFound("El artículo no existe").send(res);

      return res.status(200).send({ message: "Artículo eliminado con éxito" });
    } else {
      return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = ItemUpdateState;
