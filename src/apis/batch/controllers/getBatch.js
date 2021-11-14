const batchSchema = require('../../../models/batch');
const ErrorModel = require('../../../models/api-error');
const { DateReg } = require('../../../utils/reg-exp');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');
//probando
const schema = yup.object().shape({
  idStorage:yup.number(),
  idArea:yup.string(),
  codeItem:yup.string(),
  state:yup.string(),
  failed:yup.bool(),
  expiredAt: yup.string().matches(DateReg, 'El formato de fecha debe ser dd/mmm/yyyy')
});

const getBatch = async (req, res) => {
  try {
    const request = await Validator(req.body, schema);
    if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

      const { idStorage, idArea, codeItem, state, failed, expiredAt, } = request.data;
      let data = {};
      idStorage ? data.idStorage = idStorage : null;
      state ? data.state = state : null;
      codeItem ? data.codeItem = codeItem : null;
      typeof failed==='boolean' ? data.failed = failed : null;
      if (idStorage) idArea ? data.idArea = idArea : null;
      expiredAt ? data.expiredAt = moment(expiredAt,'DD/MM/YYYY') : null;

      const batch = await batchSchema.find(data);
      return res.status(200).send(batch);

  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);

  }

  /* res.render('index',{
    items
  }); */
};

module.exports = getBatch;