const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');
const { Hash } = require('../../../utils/hashing');
const moment = require('moment')

//Acá o podes crear schema yup o directamente personalizar mejor el schema de mongoose para que te devuelva determinados mensajitos de error. 
//Hace como te resulte más cómodo 

const CreateUser = async (req, res) => {
    try {
        //si usas yup: validar schema y controlar error

        //si usas yup: chequear si email o legajo ya existen
        //si existen devolver un new Error Model status 402, cause Bad Request, message "El email o legajo ingresados ya están siendo utilizados"

        const hashed_password = await Hash(req.body.password);
        const user = new User({
            ...req.body,
            createdAt: moment.now(), 
            password: hashed_password
        });

        const err = user.validateSync();
        if (err) return new ErrorModel().newBadRequest(err.message).send(res); //si no usas yup igual acá te valida todo. Pero con los mensajes de error de mongoose

        await user.save();

        //enviar email al usuario con los datos

        return res.status(200).send(user);
    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = CreateUser;