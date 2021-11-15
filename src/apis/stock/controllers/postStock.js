const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const moment = require('moment');
const { StockSchema } = require('../../../models/stock');
const { ItemSchema } = require("../../../models/item");


const schema = yup.object().shape({
    idItem: yup.string().required("Ingrese código del artículo"),
    currentStock: yup.number().required().typeError(" Ingrese stock en artículos"),
    batchStock: yup.number().required().typeError(" Ingrese el stock en lotes"),
    failedStock: yup.number().required().typeError(" Ingrese stock fallado"),
    minStock: yup.number().required().typeError(" Ingrese stock mínimo"),
    maxStock: yup.number().required().typeError(" Ingrese stock máximo"),
    
})

const PostStock = async (req, res) => {
    try {
        const token = res.locals.payload;

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const query = await StockSchema.find({ idItem: request.data.idItem }); 
        if(query[0]) return new ErrorModel().newBadRequest(`Stock del articulo ${request.data.idItem} - ${query[0].description} ya se encuentra en existencia en el sistema.`).send(res);

        const item = await ItemSchema.findOne({ code: request.data.idItem });
        if(!item) return new ErrorModel().newNotFound(`El articulo ${request.data.idItem} no existe en el sistema.`).send(res);

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