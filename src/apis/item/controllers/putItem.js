const { ItemSchema: Item } = require("../../../models/item");
const ErrorModel = require("../../../models/api-error");
const yup = require("yup");
const Validator = require("../../../utils/validator");
const Moment = require("moment");

const schema = yup.object().shape({
  description: yup.string().required("Ingrese descripción del artículo"),
  family: yup.string().required(" Ingrese familia del artículo"),
  group: yup.string().required(" Ingrese grupo del artículo"),
  price: yup.number().typeError(" Ingrese precio del artículo").required(),
  unit: yup.string().required(" Ingrese unidad de medida del artículo"),
  amount: yup.number().typeError(" Ingrese cantidad para la unidad de medida del artículo.").required(),
  state: yup.string().oneOf(["Activo"]).default("Activo"),
});

const ItemUpdate = async (req, res) => {
  try {
    const token = res.locals.payload;

    if (token.role === "Admin" ||  token.role === "Operario stock" || token.role === "Encargado stock" ) {
      const request = await Validator(req.body, schema);
      if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

      const { id } = req.params;
      const doc = await Item.updateOne(
        { code: id },
        { ...req.body, updatedAt: Moment.now() }
      );
      if(doc.matchedCount === 0) return new ErrorModel().newNotFound("El artículo no existe").send(res);
      
      return res.status(200).send({ message: "Artículo actualizado con éxito" });
    } else {
      return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = ItemUpdate;
