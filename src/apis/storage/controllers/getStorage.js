const StorageSchema = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");

const getStorage = async (req, res) => {
  try {
    const { state, id } = req.query;

    let storages = [];

    if (id) {
      const storage = await StorageSchema.findOne({ id });
      if (!storage) return new ErrorModel().newNotFound("El depósito no existe").send(res);

      storages.push(storage);

    } else if (state) {
      storages = await StorageSchema.find({ state });

    } else {
      storages = await StorageSchema.find();
    }

      response = []
      storages.forEach(storage => {
        let cont = 0;

        storage.area.forEach(area =>{
          if(area.available) cont ++;
        })

        let total = 0;
        if(storage.state !== "Inactivo"){
          total = cont * 100 / storage.area.length;
        } 

        let resp = {
          ...storage._doc,
          availablePercentage: `${Math.round(total * 100) / 100}%`
        }
        response.push(resp);
      })

      return res.status(200).send(response);
    
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = getStorage;
