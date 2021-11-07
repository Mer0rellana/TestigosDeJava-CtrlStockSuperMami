const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const moment = require('moment');
const { StockSchema } = require('../../../models/stock');
const { ItemSchema } = require("../../../models/item");


const schema = yup.object().shape({
    idItem: yup.number().required(),
    currentStock: yup.number().required(),
    failedStock: yup.number().required(),
    maxStock: yup.number().required(),
    minStock: yup.number().required()
})

const PostStock = async (req, res) => {
    try {
        const token = res.locals.payload;

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const query = await StockSchema.find({ idItem: request.data.idItem }); 

        if(query.lenght) return new ErrorModel().newNotFound(`Stock del articulo ${request.data.idItem} ya se encuentra en existencia en el sistema.`).send(res);

        const item = await ItemSchema.findOne({ id: request.data.idItem });

        const stock = new StockSchema({
            ...req.body,
            description: item.description,
            createdAt: moment.now()
        });

        const err = stock.validateSync();

        if (err) return new ErrorModel().newBadRequest(err.message).send(res);
  
        await stock.save();

        return res.status(200).send({ message: "Stock cargado con éxito" });
    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = PostStock;