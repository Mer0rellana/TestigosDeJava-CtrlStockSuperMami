const batchSchema = require('../../../models/batch');
const ErrorModel = require('../../../models/api-error');
const { DateReg } = require('../../../utils/reg-exp');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');

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
    const request = await Validator(req.query, schema);
    if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

      const { idStorage, idArea, codeItem, state, failed, expiredAt, id} = request.data;
      if(id){
        const batch = await batchSchema.find({id: id});
        console.log(batch);
        return res.status(200).send(batch);
      }
      let data = {};
      idStorage ? data.idStorage = idStorage : null;
      state ? data.state = state : null;
      codeItem ? data.codeItem = codeItem : null;
      typeof failed==='boolean' ? data.failed = failed : null;
      if (idStorage) idArea ? data.idArea = idArea : null;
      expiredAt ? data.expiredAt = moment(expiredAt,'DD/MM/YYYY') : null;

      const batch = await batchSchema.find(data);

      const response = batch.map(b => {
        b = {
            amount:b.amount,
            codeItem:b.codeItem,
            descriptionItem:b.descriptionItem,
            expiredAt: moment(b.expiredAt).format('DD/MM/YYYY'),
            failed:b.falied,
            id:b.id,
            idArea:b.idArea,
            idStorage:b.idStorage,
            state:b.state,
            _id:b._id
        }
        return b;
    })
      return res.status(200).send(response);

  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);

  }
};

module.exports = getBatch;