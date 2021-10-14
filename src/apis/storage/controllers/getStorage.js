const StorageSchema = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");

const getStorage = async (req, res) => {
  try {
    const token = res.locals.token;
    if (
      token.role === "Operario almacén" ||
      token.role === "Operario stock" ||
      token.role === "Admin" ||
      token.role === "Encargado stock" ||
      token.role === "Gerencia"
    ) {
      const id = req.query;
      if (id) {
        const storage = await StorageSchema.find();
        return res.status(200).send(storage); 
      } else {
        const storages = await StorageSchema.findOne({id: id});
        return res.status(200).send(storages);
      }
    };
    return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
  } catch (err) {
      return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = getStorage;