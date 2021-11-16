const { StorageSchema } = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");
const Validator = require('../../../utils/validator');
const yup = require("yup");


const schema = yup.object().shape({
  mts: yup.number().required().typeError(" Debe ingresar mts cuadrados del depósito"),
  state: yup.string().oneOf(["Bloqueado", "Activo", "Inactivo"])
})

const PutStorage = async (req, res) => {

  try {
    const token = res.locals.payload;

    const request = await Validator(req.body, schema);
    if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

    if (
      token.role === "Admin" ||
      token.role === "Encargado stock" || token.role === "Operario stock" 
    ) {

      const { id } = req.params;

      const storage = await StorageSchema.updateOne(
        { id: id },
        { ...req.body, updatedAt: Moment.now() }
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
