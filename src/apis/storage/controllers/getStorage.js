const StorageSchema = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");

const getStorage = async (req, res) => {
  try {
    const { state,id } = req.query;
    if (id) {
      const storage = await StorageSchema.findOne({ id });
      if (!storage)
        return new ErrorModel().newNotFound("El deposito no existe").send(res);
      return res.status(200).send(storage);
    }else if (state){
      const storages = await StorageSchema.find({ state });
      return res.status(200).send(storages);
    } 
    else {
      const storages = await StorageSchema.find();
      const cont
      for (let i  = 0; i < storages.length; i++) {
        if(storages[i].state === "Activo"){
          cont ++;
        }
      }
      return res.status(200).send(storages);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = getStorage;