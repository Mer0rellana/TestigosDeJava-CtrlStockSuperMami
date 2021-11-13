const BatchSchema = require("../../../models/batch");
const ErrorModel = require("../../../models/api-error");
const StorageSchema = require("../../../models/storage");
const Moment = require("moment");
const yup = require("yup");
const Validator = require("../../../utils/validator");

const schema = yup.object().shape({
  idStorage: yup.number().required().typeError("Ingrese ID del depósito"),
  idArea: yup.string().required(" Ingrese código de área").min(2, " El código de área debe tener dos caracteres").max(2, " El código de área debe tener dos caracteres")
});

const BatchUpdate = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (
      token.role === "Admin" ||
      token.role === "Encargado stock" ||
      token.role === "Operario almacén"
    ) {
      const request = await Validator(req.body, schema);
      if (request.err)
        return new ErrorModel().newBadRequest(request.data).send(res);
      const { id } = req.params;
      const idStorage = req.body.idStorage;
      const area = req.body.idArea;
      const batch2 = await BatchSchema.findOne({ id: id });
      const batch = await BatchSchema.updateOne(
        { id: id },
        { ...req.body, updatedAt: Moment.now() }
      );
      const storage2 = await StorageSchema.updateOne(
        { id: batch2.idStorage, "area.id": batch2.idArea },
        {
          "area.$.available": true,
        
        }
      );
      if (storage2.matchedCount === 0)
        return new ErrorModel().newNotFound("El depósito no existe").send(res);
      const storage = await StorageSchema.updateOne(
        {
          id: idStorage,
          "area.id": area,
        },
        {
          "area.$.id": area,
          "area.$.available": false,
        }
      );

      if (storage.matchedCount === 0)
        return new ErrorModel().newNotFound("El depósito no existe").send(res);
      if (batch.matchedCount === 0)
        return new ErrorModel().newNotFound("El lote no existe").send(res);

      return res.status(200).send({ message: "Lote actualizado con éxito" });
    } else {
      return new ErrorModel()
        .newUnauthorized("Usuario no autorizado")
        .send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = BatchUpdate;