const Validator = require('../../../utils/validator');
const yup = require("yup");
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const Transaction = require('../../../models/transaction');
const Batch = require('../../../models/batch');

const schema = yup.object().shape({
    anulatedReason: yup.string().required()
})

const TSstate = async (req, res) => {
    try {

        const token = res.locals.payload;
        if (token.role === "Admin" || token.role === "Encargado stock" || token.role === "Operario stock" || token.role === "Gerencia") {

            const { _id } = req.params;
            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            let arrayBatches = [];

            const query = await Transaction.findById({ _id: _id });

            if (query.type === "Entrada") {

                for (const b of query.batches) {

                    arrayBatches.push(b);

                    await Batch.deleteOne({ id: b });
                }

                const doc = await Transaction.updateOne({
                    _id: _id
                }, {
                    state: 'Anulado',
                    updatedAt: moment.now(),
                    anulatedReason: request.data.anulatedReason + " " + arrayBatches,
                    userId: token.id
                });

            } else {
                for (const b of query.batches) {

                    const doc = await Batch.updateOne({
                        id: b
                    }, {
                        state: 'Almacenado',
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

            return res.status(200).send({ message: "Movimiento actualizado con éxito" });

        } else {
            return new ErrorModel().newUnauthorized().send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = TSstate;

