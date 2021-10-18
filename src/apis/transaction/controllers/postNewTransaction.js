const Transaction = require('../../../models/transaction');
const Batch = require('../../../models/batch');
const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const { ItemSchema: Item } = require("../../../models/item");
const moment = require('moment');

const schema = yup.object().shape({
    type: yup.string().required().oneOf(['Entrada', 'Salida']),
    batches: yup.array(
        yup.object({
            id: yup.string().required(),
            codeItem: yup.string().required(),
            expiredAt: yup.string().optional(),
            amount: yup.number().required()
        }).required()
    ).required(),
});

const CreateTransaction = async (req, res) => {
    try {
        const token = res.locals.payload;

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        if (token.role === "Admin" || token.role === "Encargado stock" || token.role === "Operario stock" || token.role === "Gerencia") {
            
            let arrayBatches = [];

            for (const b of request.data.batches) {

                const item = await Item.find({ code: b.codeItem });
                if (!item.length) return new ErrorModel().newNotFound(`El código ${b.codeItem} no pertenece a ningún artículo del sistema`).send(res);

                if (request.data.type === "Entrada") {

                    const query = await Batch.find({ id: b.id });
                    if (query.length) return new ErrorModel().newBadRequest(`El lote número ${b.id} ya existe en el sistema`).send(res);

                    const batch = new Batch({
                        id: b.id,
                        codeItem: b.codeItem,
                        descriptionItem: item[0].description,
                        state: 'Ingresado',
                        amount: b.amount,
                        expiredAt: b.expiredAt ? moment(b.expiredAt).valueOf() : 0,
                    })

                    const err = batch.validateSync();
                    if (err) return new ErrorModel().newBadRequest(err.message).send(res);

                    await batch.save();

                } else {

                    const doc = await Batch.updateOne({
                        id: b.id
                    }, {
                        state: 'Egresado',
                        updatedAt: moment.now()
                    });
                    if (doc.matchedCount === 0) return new ErrorModel().newNotFound(`El lote ${b.id} no existe en el sistema`).send(res);
                }

                arrayBatches.push(b.id);
            }

            const transaction = new Transaction({
                type: request.data.type,
                idUser: token.id,
                batches: arrayBatches,
                createdAt: moment.now(),
            });

            const err = transaction.validateSync();
            if (err) return new ErrorModel().newBadRequest(err.message).send(res);

            await transaction.save();

            return res.status(200).send({ message: "Movimiento cargado con exito" });
        } else {
            return new ErrorModel().newUnauthorized().send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = CreateTransaction;
