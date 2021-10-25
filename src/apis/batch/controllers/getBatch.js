const batchSchema = require('../../../models/batch');
const ErrorModel = require('../../../models/api-error');

const getBatch = async (req, res) => {
  try {
    const token = res.locals.payload;
    if (token.role === "Admin") {
      const { idStorage, idArea, codeItem, state, failed, expiredAt, } = req.body;
      let data = {};
      idStorage ? data.idStorage = idStorage : null;
      state ? data.state = state : null;
      codeItem ? data.codeItem = codeItem : null;
      failed ? data.failed = failed : null;
      if (idStorage) idArea ? data.idArea = idArea : null;
      expiredAt ? data.expiredAt = expiredAt : null;
      const batch = await batchSchema.find(data);
      return res.status(200).send(batch);

    };

    return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);

  }

  /* res.render('index',{
    items
  }); */
};

module.exports = getBatch;