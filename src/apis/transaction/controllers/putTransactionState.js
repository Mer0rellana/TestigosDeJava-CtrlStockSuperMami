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

        //agregar un iduser del que dio la baja
        //si es de entrada ponemos anulado y se eliminan los lotes
        //si es de salida modificamos el state, razon de anulado y a los lotes asociados ponemos el state almacenado.
        const token = res.locals.payload;
        if (token.role === "Admin" || token.role === "Encargado stock" || token.role === "Operario stock" || token.role === "Gerencia") {

            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            let arrayBatches = [];

            if (request.type === "Entrada") {

                for (const b of request.data.batches) {

                    arrayBatches.push(b.id);

                    await Batch.deleteOne({ id: b.id });
                }

                const doc = await Transaction.updateOne({
                    id: request.data._id
                }, {
                    state: 'Anulado',
                    updatedAt: moment.now(),
                    anulatedReason: request.data.anulatedReason + "\n" + arrayBatches,
                    userId: token.id
                });

            } else {
                for (const b of request.data.batches) {
                    
                    const doc = await Batch.updateOne({
                        id: b.id
                    }, {
                        state: 'Almacenado',
                        updatedAt: moment.now()
                    });

                    if (doc.matchedCount === 0) return new ErrorModel().newNotFound(`El lote ${b.id} no existe en el sistema`).send(res);
                }

                await Transaction.updateOne({
                    id: request.data._id
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

