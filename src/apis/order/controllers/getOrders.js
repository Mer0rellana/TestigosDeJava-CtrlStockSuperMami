const Orders = require('../../../models/order');
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
    state: yup.string().oneOf(["Anulado", "Pendiente", "Remitido"])
});

const GetOrders = async (req, res) => {
    try {
        const request = await Validator(req.query, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        let orders = []

        if (request.data.state) {
            orders = await Orders.find({ state: request.data.state });
        } else {
            orders = await Orders.find();
        }

        const response = orders.map(o => {
            o = {
                createdAt: moment(o.createdAt).format('DD/MM/YYYY'),
                deliveryDate: moment(o.deliveryDate).format('DD/MM/YYYY'),
                state: o.state,
                items: o.items
            }
            return o;
        })

        return res.status(200).send(response);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = GetOrders;