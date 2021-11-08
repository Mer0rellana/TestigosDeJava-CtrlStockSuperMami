const { InventorySchema } = require("../../../models/inventory");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");

const putInventaryState = async (req, res) => {
  try {
    const token = res.locals.payload;
    const fecha = Moment.now();
    const { _id } = req.params;
    console.log(_id)

    if (
      token.role === "Admin" ||
      token.role === "Encargado stock" ||
      token.role === "Gerencia" ||
      token.role === "Operario Stock"
    ) {
      const doc = await InventorySchema.find({ _id: _id });

      if (!doc[0].adjusted) {
        const inventory = await InventorySchema.updateOne(
          { _id: _id },
          { $set: { state: "Inactivo", updatedAt: fecha } }
        );
        if (inventory.matchedCount === 0)
          return new ErrorModel()
            .newNotFound("El Inventario no existe")
            .send(res);
        return res
          .status(200)
          .send({ message: "Inventario eliminado con exito" })
          ;
      } else {
        return new ErrorModel()
          .newBadRequest(
            "No se puede eliminar un Inventario que ha sido ajustado"
          )
          .send(res);
      }
    } else {
      return new ErrorModel()
        .newUnauthorized("Usuario no autorizado")
        .send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = putInventaryState;