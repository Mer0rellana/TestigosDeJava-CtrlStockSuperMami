const { ItemSchema: Item } = require("../../../models/item");
const ErrorModel = require("../../../models/api-error");
const yup = require("yup");
const Validator = require("../../../utils/validator");
const Moment = require("moment");

const schema = yup.object().shape({
  description: yup.string().min(3).max(30),
  family: yup.string().min(3).max(30),
  group: yup.string().min(3).max(30),
  price: yup.number().positive(),
  unit: yup.string().min(3).max(30),
  amount: yup.number().max(30),
  //discutir en que endpoint va a ir cada estado
  state: yup.string().oneOf(["Activo", "Bloqueado"]).default("Activo"),
});

const ItemUpdate = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {
      const request = await Validator(req.body, schema);
      if (request.err)
        return new ErrorModel().newBadRequest(request.data).send(res);
      const { id } = req.params;
      await Item.updateOne(
        { code: id },
        { ...req.body, updateDate: Moment.now() }
      );
      console.log(req.body);
      return res.status(200).send({ message: "Un Exito" });
    } else {
      return new ErrorModel()
        .newUnauthorized("Usuario no autorizado")
        .send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = ItemUpdate;
