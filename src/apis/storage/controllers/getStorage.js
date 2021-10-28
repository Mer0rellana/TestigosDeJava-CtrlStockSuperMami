const { StorageSchema } = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");

const getStorage = async (req, res) => {
  try {
    const { state, id } = req.query;

    if (id) {
      const storage = await StorageSchema.findOne({ id });
      if (!storage) return new ErrorModel().newNotFound("El depósito no existe").send(res);

      return res.status(200).send(storage);

    } else if (state) {
      const storages = await StorageSchema.find({ state });
      return res.status(200).send(storages);

    } else {
      const storages = await StorageSchema.find();
      
      response = []
      storages.forEach(storage => {
        let cont = 0;

        storage.area.forEach(area =>{
          if(area.available) cont ++;
        })

        let total = cont * 100 / storage.area.length;
        
        let resp = {
          ...storage._doc,
          availablePercentage: `${total}%`
        }
        response.push(resp);
      })
    
      return res.status(200).send(response);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = getStorage;
