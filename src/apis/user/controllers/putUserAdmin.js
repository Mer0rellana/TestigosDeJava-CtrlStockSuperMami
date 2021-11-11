const Validator = require('../../../utils/validator');
const yup = require("yup");
const ErrorModel = require('../../../models/api-error');
const User = require('../../../models/user');
const moment = require('moment');
const { PhoneReg } = require('../../../utils/reg-exp');

const schema = yup.object().shape({
    dni: yup.string().required().typeError("Ingrese dni válido").min(8, " El dni debe tener 8 digitos").max(8, " El dni debe tener 8 digitos"),
    id: yup.number().required().typeError(" Ingrese ID del usuario"),
    name: yup.string().required(" Ingrese nombre completo del usuario"),
    mail: yup.string().email(" Ingrese un mail válido").required(" Ingrese mail").transform((dato) => dato.toLowerCase()),
    tel: yup.string().matches(PhoneReg, {message:" El número debe tener el siguiente formato 3516319913"}).required(" Ingrese teléfono"),
    role: yup.string().required(" Seleccione un rol"),
})

const UpdateAdmin = async (req, res) => {
    try {

        const token = res.locals.payload;
        if (token.role === "Admin") {

            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            const { id } = req.params;
            console.log(id);
            console.log(request.data);

            await User.updateOne({
                id: id
            }, {
                ...request.data,
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