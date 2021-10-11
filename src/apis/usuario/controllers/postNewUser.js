const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');
const { Hash } = require('../../../utils/hashing');
const moment = require('moment');
const yup = require('yup');
const Validator = require('../../../utils/validator');
const SendTemplate = require('../../../utils/sendMail');
const { createUserToken } = require('../../../utils/token');

const schema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    dni: yup.number().required(),
    mail: yup.string().email().required().transform((dato) => dato.toLowerCase()),
    tel: yup.number().required(),
    password: yup.string().required(),
    role: yup.string().required()
})

const CreateUser = async (req, res) => {
    try {

        const token = res.locals.payload;
        if (token.role === "Admin") {  

            const request = await Validator(req.body, schema);
            if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

            const query = await User.find({ id: request.data.id, mail: request.data.mail });

            if (query.length) return new ErrorModel(402, "Bad request", "El usuario ya existe").send(res);

            const hashed_password = await Hash(req.body.password);

            const user = new User({
                ...req.body,
                createdAt: moment.now(),
                password: hashed_password
            });

            const err = user.validateSync();
            if (err) return new ErrorModel().newBadRequest(err.message).send(res);

            await user.save();

            const sending = await SendTemplate(user.mail, "Control Stock Super Mami - Bienvenida", "sendEmail", { principalInfo: "Bienvenido al equipo de Super Mami!", secondaryInfo: `Su legajo es ${user.id}. Su contraseña es ${request.data.password}` });
            if (sending.error) return new ErrorModel(535, sending.error, "Error en el envío de email").send(res);

            const token = createUserToken( user.id, user.name, user.role, user.state );
            
            return res.status(200).send({message: "Usuario cargado con exito"});

        } else{
            return new ErrorModel().newUnauthorized().send(res); 
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = CreateUser;