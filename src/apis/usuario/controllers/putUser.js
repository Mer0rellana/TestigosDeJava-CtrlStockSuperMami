const  Validator  = require('../../../utils/validator');
const yup = require("yup");
const ErrorModel = require('../../../models/api-error');
const User = require('../../../models/user');
const moment = require('moment')


const schema = yup.object().shape({
    name: yup.string(),
    tel: yup.number(),
    mail: yup.string().email().transform((dato) => dato.toLowerCase())
})

const UpdateUser = async (req, res) =>{
    try { 

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const token = res.locals.payload;
        const id = token.id;

        const user = new User({
            ...req.body,
            UpdatedAt: moment.now(), 
        });

        const err = user.validateSync();
        if (err) return new ErrorModel().newBadRequest(err.message).send(res);

        const doc = await user.findOneAndUpdate(id, user);

        const sending = await SendTemplate(user.mail, "Control Stock Super Mami - Perfil actualizado", "sendEmail", { principalInfo: `El usuario ${user.id} ha actualizado su perfil con exito` });
        if (sending.error) return new ErrorModel(535, sending.error, "Error en el envío de email").send(res);

        return res.status(200).send(doc);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = UpdateUser;