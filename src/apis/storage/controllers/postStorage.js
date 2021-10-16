const StorageSchema = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");

const postStorage = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (
      token.role === "Admin" ||
      token.role === "Encargado stock" ||
      token.role === "Gerencia"
    ) {
      const storage = new StorageSchema({
        ...req.body,
        state: "Activo",
        createdAt: Moment.now(),
      });
      const err = storage.validateSync();
      if (err) return new ErrorModel().newBadRequest(err.message).send(res);
      await storage.save();
      return res.status(200).send(storage);
    } else {
      return new ErrorModel()
        .newUnauthorized("Usuario no autorizado")
        .send(res);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = postStorage;
