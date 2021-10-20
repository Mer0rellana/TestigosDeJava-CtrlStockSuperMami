const Transaction = require('../../../models/transaction');
const Batch = require('../../../models/batch');
const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const { ItemSchema: Item } = require("../../../models/item");
const moment = require('moment');
const { DateReg } = require('../../../utils/reg-exp');

const schema = yup.object().shape({
    type: yup.string().required("Debe ingresar el tipo de movimiento").oneOf(['Entrada', 'Salida'], 'Los tipos de movimiento son entrada y salida'),
    batches: yup.array(
        yup.object({
            id: yup.string().required("Debe ingresar el id del lote"),
            codeItem: yup.string().required("Debe ingresar el código del artículo"),
            expiredAt: yup.string().optional().matches(DateReg, 'El formato de fecha debe ser dd/mmm/yyyy'),
            amount: yup.number().required("Debe ingresar la cantidad del artículo")
        }).required("Debe ingresar lotes")
    ).required("Debe ingresar lotes"),
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

                const query = await Batch.find({ id: b.id });

                if (request.data.type === "Entrada") {

                    if (query.length) return new ErrorModel().newBadRequest(`El lote número ${b.id} ya existe en el sistema`).send(res);

                    const batch = new Batch({
                        id: b.id,
                        codeItem: b.codeItem,
                        descriptionItem: item[0].description,
                        state: 'Ingresado',
                        amount: b.amount,
                        expiredAt: b.expiredAt ? moment(b.expiredAt, "DD-MM-YYYY") : 0,
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
                    if(query[0].state ==="Egresado") return new ErrorModel().newBadRequest(`El lote ${b.id} ya ha egresado del sistema`).send(res);
                }

                arrayBatches.push(b.id);
            }

            const date = moment(moment().toDate()).format('DD/MM/YYYY')
            const transaction = new Transaction({
                type: request.data.type,
                idUser: token.id,
                batches: arrayBatches,
                createdAt: moment(date, "DD-MM-YYYY"),
            });

            const err = transaction.validateSync();
            if (err) return new ErrorModel().newBadRequest(err.message).send(res);

            await transaction.save();

            return res.status(200).send({ message: "Movimiento cargado con éxito" });
        } else {
            return new ErrorModel().newUnauthorized().send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = CreateTransaction;
