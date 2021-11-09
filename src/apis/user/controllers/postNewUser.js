const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');
const { Hash } = require('../../../utils/hashing');
const moment = require('moment');
const yup = require('yup');
const Validator = require('../../../utils/validator');
const SendTemplate = require('../../../utils/sendMail');
const { PasswordReg, PhoneReg } = require('../../../utils/reg-exp');

const schema = yup.object().shape({
    dni: yup.number().required().typeError("Ingrese dni válido").min(8, " El dni debe tener 8 digitos").max(8, " El dni debe tener 8 digitos"),
    id: yup.number().required().typeError(" Ingrese ID del usuario"),
    name: yup.string().required(" Ingrese nombre completo del usuario"),
    mail: yup.string().email(" Ingrese un mail válido").required(" Ingrese mail").transform((dato) => dato.toLowerCase()),
    tel: yup.string().matches(PhoneReg, {message:" El número debe tener el siguiente formato 3516319913"}).required(" Ingrese teléfono"),
    password: yup.string().matches(PasswordReg, {message:" La contraseña debe tener mínimo 8 caracteres y máximo 12. Debe contener al menos una mayúscula, una minúscula y un número"}).required(" Ingrese contraseña"),
    role: yup.string().required(" Seleccione un rol"),
})

const CreateUser = async (req, res) => {
    try {

        const token = res.locals.payload;
        if (token.role === "Admin") {

            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            const query1 = await User.find({ id: request.data.id});
            const query2 = await User.find({ mail: request.data.mail});
            if (query1[0] || query2[0]) return new ErrorModel().newBadRequest("El id del usuario ingresado ya existe en el sistema").send(res);
            if (query1[0] || query2[0]) return new ErrorModel().newBadRequest("El mail del usuario ingresado ya existe en el sistema").send(res);

            const hashed_password = await Hash(req.body.password);

            const user = new User({
                ...req.body,
                createdAt: moment.now(),
                password: hashed_password
            });

            const err = user.validateSync();
            if (err) return new ErrorModel().newBadRequest(err.message).send(res);

            await user.save();

            const sending = await SendTemplate(user.mail, "Control Stock Super Mami - Bienvenida", "sendEmail", { principalInfo: "¡Bienvenido al equipo de Super Mami!", secondaryInfo: `Su legajo es ${user.id}. Su contraseña es ${request.data.password}` });
            if (sending.error) return new ErrorModel(535, sending.error, "Error en el envío de email").send(res);

            return res.status(200).send({ message: "Usuario cargado con éxito" });

        } else {
            return new ErrorModel().newUnauthorized().send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = CreateUser;