const OrderSchema = require("../../../models/order");
const ErrorModel = require("../../../models/api-error");
const moment = require("moment");
const yup = require("yup");
const Validator = require('../../../utils/validator');
const { DateReg } = require("../../../utils/reg-exp");

const schema = yup.object().shape({
    createdAt: yup.string().required(DateReg, 'El formato de fecha debe ser dd/mmm/yyyy'),
    deliveryDate: yup.string().required(DateReg, 'El formato de fecha debe ser dd/mmm/yyyy'),
    state: yup.string().oneOf(["Pendiente", "Remitido", "Anulado"]),
    items: yup.array(
        yup.object({
            code: yup.string().required(),
            amount: yup.number().required(),
            description: yup.string().required(),
        }).required()
    )
});

const postOrder = async (req, res) => {
    try {
        const token = res.locals.payload

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        if (token.role === "Admin") {

            const order = new OrderSchema({
                ...request.data,
                createdAt: moment(request.data.createdAt, "DD-MM-YYYY"),
                deliveryDate: moment(request.data.deliveryDate, "DD-MM-YYYY") 
            });

            const err = order.validateSync();
            if (err) return new ErrorModel().newBadRequest(err.message).send(res);

            await order.save();
            return res.status(200).send({message: "Pedido cargado con éxito"});

        } else {
            return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
        }
    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = postOrder;
