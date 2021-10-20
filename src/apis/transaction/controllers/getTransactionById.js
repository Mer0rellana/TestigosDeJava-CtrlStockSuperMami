const Transaction = require('../../../models/transaction');
const User = require('../../../models/user');
const Batch = require('../../../models/batch');
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
    id: yup.string().max(24, 'El id del movimiento debe tener 24 caracteres').min(24)
});

const GetTransaction = async (req, res) => {
    try {
        const request = await Validator(req.params, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const transaction = await Transaction.find({ _id: req.params.id });
        if (!transaction.length) return new ErrorModel().newNotFound('El movimiento no existe').send(res);

        const user = await User.find({ id: transaction[0].idUser });

        let arrayBatches = []

        for (const b of transaction[0].batches) {

            const query = await Batch.find({id: b});
            if (query[0]) {
                const batch = {
                    id: query[0].id,
                    codeItem: query[0].codeItem,
                    descriptionItem: query[0].descriptionItem,
                    amount: query[0].amount,
                    expiredAt: query[0].expiredAt != 0 ? moment(query[0].expiredAt).format('DD/MM/YYYY') : "",
                }
                arrayBatches.push(batch);
            }
        }

        const response = {
            id: transaction[0]._id,
            type: transaction[0].type,
            createdAt: moment(transaction[0].createdAt).format('DD/MM/YYYY'),
            responsable: `${transaction[0].idUser}, ${user[0].name}`,
            state: transaction[0].state,
            updatedAt: transaction[0].updatedAt ? moment(transaction[0].updatedAt).format('DD/MM/YYYY') : "",
            anulatedReason: transaction[0].anulatedReason,
            batches: arrayBatches
        }

        return res.status(200).send(response);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = GetTransaction;