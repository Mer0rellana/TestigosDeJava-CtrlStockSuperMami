const Validator = require('../../../utils/validator');
const yup = require("yup");
const ErrorModel = require('../../../models/api-error');
const User = require('../../../models/user');
const moment = require('moment');
const { PhoneReg } = require('../../../utils/reg-exp');

const schema = yup.object().shape({
    id: yup.number(),
    name: yup.string(),
    dni: yup.number(),
    mail: yup.string().email().transform((dato) => dato.toLowerCase()),
    tel: yup.string().matches(PhoneReg),
    role: yup.string().oneOf(["Admin", "Gerencia", "Encargado stock", "Operario stock", "Operario almacén"])
})

const UpdateAdmin = async (req, res) => {
    try {

        const token = res.locals.payload;
        if (token.role === "Admin") {

            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            const { id } = req.params;

            await User.updateOne({
                id: id
            }, {
                ...request.data.body,
                updatedAt: moment.now()
            });

            return res.status(200).send({ message: "Perfil actualizado con éxito" });

        } else {
            return new ErrorModel().newUnauthorized().send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = UpdateAdmin;