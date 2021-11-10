const { ItemSchema } = require("../../../models/item");
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
  code: yup.string().required("Ingrese código del artículo"),
  description: yup.string().required(" Ingrese descripción del artículo"),
  family: yup.string().required(" Ingrese familia del artículo"),
  group: yup.string().required(" Ingrese grupo del artículo"),
  price: yup.number().typeError(" Ingrese precio del artículo").required(),
  unit: yup.string().required(" Ingrese unidad de medida del artículo"),
  amount: yup.number().typeError(" Ingrese cantidad para la unidad de medida del artículo.").required(),
})

const postItem = async (req, res) => {

  try {
    const token = res.locals.payload;

    const request = await Validator(req.body, schema);
    if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

    if (token.role === "Admin") {

      const query = await ItemSchema.find({ code: req.body.code });
      if (query.length) return new ErrorModel().newBadRequest("El código de artículo ya existe en el sistema").send(res);

      const item = new ItemSchema({
        ...req.body,
        state: "Activo",
        createdAt: moment.now()

      });
      const err = item.validateSync();
      if (err) return new ErrorModel().newBadRequest(err.message).send(res);
      await item.save();
      return res.status(200).send({ message: "El artículo se creó exitosamente" });
    }
    return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
    //res.redirect('/');
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = postItem;
