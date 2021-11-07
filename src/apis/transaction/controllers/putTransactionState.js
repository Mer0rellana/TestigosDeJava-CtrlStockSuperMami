const Validator = require('../../../utils/validator');
const yup = require("yup");
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const Transaction = require('../../../models/transaction');
const Batch = require('../../../models/batch');
const Storage = require('../../../models/storage');

const schema = yup.object().shape({
    anulatedReason: yup.string().required('La razón de anulado es un campo obligatorio').max(1500)
})

const TSstate = async (req, res) => {
    try {

        const token = res.locals.payload;
        if (token.role === "Admin" || token.role === "Encargado stock" || token.role === "Operario stock" || token.role === "Gerencia") {

            const { _id } = req.params;
            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            let arrayBatches = [];

            const query = await Transaction.find({ _id: _id });
            if (!query.length) return new ErrorModel().newNotFound('El movimiento no existe').send(res);

            if (query[0].type === "Entrada") {

                for (const b of query[0].batches) {
                    arrayBatches.push(b);

                    const batch = await Batch.find({ id: b});
                    const storage = await Storage.findOne({ id: batch[0].idStorage });
                    const area = storage.area.filter(area => area.id === batch[0].idArea);

                    area[0].available = "true";
                    await storage.save();
                    await Batch.deleteOne({ id: b });
                }

                await Transaction.updateOne({
                    _id: _id
                }, {
                    state: 'Anulado',
                    updatedAt: moment.now(),
                    anulatedReason: `${request.data.anulatedReason}. Los lotes anulados son ${arrayBatches}`,
                    userId: token.id
                });

            } else {
                for (const b of query.batches) {

                    const doc = await Batch.updateOne({
                        id: b
                    }, {
                        state: 'Ingresado',
                        updatedAt: moment.now()
                    });

                    if (doc.matchedCount === 0) return new ErrorModel().newNotFound(`El lote ${b.id} no existe en el sistema`).send(res);
                }

                await Transaction.updateOne({
                    _id: _id
                }, {
                    state: 'Anulado',
                    updatedAt: moment.now(),
                    anulatedReason: request.data.anulatedReason,
                    userId: token.id
                });
            }

            return res.status(200).send({ message: "Movimiento anulado con éxito" });

        } else {
            return new ErrorModel().newUnauthorized().send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = TSstate;

