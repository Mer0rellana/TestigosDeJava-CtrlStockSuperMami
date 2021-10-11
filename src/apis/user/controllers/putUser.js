const  Validator  = require('../../../utils/validator');
const yup = require("yup");
const ErrorModel = require('../../../models/api-error');
const User = require('../../../models/user');
const moment = require('moment');
const SendTemplate = require('../../../utils/sendMail');

const schema = yup.object().shape({
    name: yup.string(),
    tel: yup.number(),
    mail: yup.string().email().transform((dato) => dato.toLowerCase())
})

const UpdateProfile = async (req, res) =>{
    try { 

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const token = res.locals.payload;
        const uid = token.id;

        const doc = await User.updateOne({ 
            id: uid }, 
            { ...req.body,
            UpdatedAt: moment.now(), 
        });

        const sending = await SendTemplate(request.data.mail, "Control Stock Super Mami - Perfil actualizado", "sendEmail", { principalInfo: `El usuario ${request.data.id} ha actualizado su perfil con éxito` });
        if (sending.error) return new ErrorModel(535, sending.error, "Error en el envío de email").send(res);

        return res.status(200).send({ message: "Perfil actualizado con éxito"});

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = UpdateProfile;