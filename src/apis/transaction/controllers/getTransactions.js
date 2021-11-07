const Transaction = require('../../../models/transaction');
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const { DateReg } = require('../../../utils/reg-exp');

const schema = yup.object().shape({
    createdAt: yup.string().matches(DateReg, 'El formato de fecha debe ser dd/mmm/yyyy'),
    type: yup.string().oneOf(["Entrada", "Salida"], 'Los tipos de movimiento son entrada y salida')
});

const GetTransactions = async (req, res) => {
    try {
        const request = await Validator(req.query, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        let transactions = []
        if (request.data.createdAt && !request.data.type) {
            transactions = await Transaction.find({ createdAt: moment(request.data.createdAt, 'DD-MM-YYYY') });
        } else if (request.data.type && !request.data.createdAt) {
            transactions = await Transaction.find({ type: request.data.type });
        } else if (request.data.type && request.data.createdAt) {
            transactions = await Transaction.find({ type: request.data.type, createdAt: moment(request.data.createdAt, 'DD-MM-YYYY') });
        } else {
            transactions = await Transaction.find();
        }

        const response = transactions.map(t => {
            t = {
                id: t._id,
                type: t.type,
                idUser: t.idUser,
                createdAt: moment(t.createdAt).format('DD/MM/YYYY')
            }
            return t
        })

        return res.status(200).send(response);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = GetTransactions;