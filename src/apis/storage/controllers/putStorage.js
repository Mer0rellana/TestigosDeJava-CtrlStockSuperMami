const StorageSchema = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");
const yup = require("yup");
const Validator = require("../../../utils/validator");

/* const schema = yup.object().shape({
  mts: yup.number().min(1).max(30),
  area: yup.object().shape({
    available: yup.boolean(),
    id: yup.string().min(2).max(2),
  })
}); */

const PutStorage = async (req, res) => {
  try {
    const token = res.locals.payload;

    if (
      token.role === "Admin" ||
      token.role === "Encargado stock" ||
      token.role === "Gerencia"
    ) {
      /* const request = await Validator(req.body, schema);
      if (request.err)
        return new ErrorModel().newBadRequest(request.data).send(res); */
      const { id } = req.params;

      const storage = await StorageSchema.updateOne(
        {id: id},
        {...req.body, updatedAt: Moment.now() } 
      );

      if (storage.matchedCount === 0)
        return new ErrorModel().newNotFound("El depósito no existe").send(res);

      return res
        .status(200)
        .send({ message: "El depósito fue actualizado de forma exitosa" });
    } else {
      return new ErrorModel()
        .newUnauthorized("Usuario no autorizado")
        .send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = PutStorage;
