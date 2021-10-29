const StorageSchema = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
  id: yup.number().required("Debe ingresar id del depósito"),
  mts: yup.number().required("Debe ingresar mts cuadrados del depósito"),
  rows: yup.number().required("Debe ingresar cantidad de filas del depósito"),
  columns: yup.number().required("Debe ingresar cantidad columnas del depósito")
});

const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const postStorage = async (req, res) => {
  try {
    const token = res.locals.payload;

    const request = await Validator(req.body, schema);
    if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

    if (token.role === "Admin" || token.role === "Encargado stock" || token.role === "Gerencia") {

      const storage = new StorageSchema({
        id: request.data.id,
        mts: request.data.mts,
        createdAt: Moment.now(),
        state: "Activo",
      });

      for (let r = 0; r < request.data.rows; r++) {
        for (let c = 1; c <= request.data.columns; c++) {
          const area = {
            id: char.charAt(r) + String(c),
            available: true
          };
          storage.area.push(area);
        }
      }

      const err = storage.validateSync();
      if (err) return new ErrorModel().newBadRequest(err.message).send(res);

      await storage.save();
      return res.status(200).send("Depósito cargado con éxito");

    } else {
      return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = postStorage;
