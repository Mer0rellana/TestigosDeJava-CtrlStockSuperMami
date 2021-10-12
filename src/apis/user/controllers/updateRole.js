const Validator = require('../../../utils/validator');
const yup = require("yup");
const ErrorModel = require('../../../models/api-error');
const User = require('../../../models/user');
const moment = require('moment');

const schema = yup.object().shape({
    role: yup.string().oneOf(["Admin", "Gerencia", "Encargado stock", "Operario stock", "Operario almacén"])
})

const UpdateRole = async (req, res) => {
    try {

        const token = res.locals.payload;
        if (token.role === "Admin") {

            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            const { id } = req.params;
            await User.updateOne({
                id: id
            }, {
                role: request.data.role,
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

module.exports = UpdateRole;