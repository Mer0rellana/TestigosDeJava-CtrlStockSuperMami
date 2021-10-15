
const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const SendTemplate = require('../../../utils/sendMail');
const RandomPassword = require('secure-random-password');
const { Hash } = require('../../../utils/hashing');

const schema = yup.object().shape({
    mail: yup.string().email().required().transform((data) => data.toLowerCase()),
});

const RecoverPassword = async (req, res) => {
    try {
        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const user = await User.find({ mail: request.data.mail });
        if (!user.length) return new ErrorModel().newNotFound("El mail ingresado no existe").send(res);
    
        const newPassword = RandomPassword.randomPassword({
            characters: [
                { characters: RandomPassword.lower, exactly: 3 },
                { characters: RandomPassword.upper, exactly: 3 },
                { characters: RandomPassword.digits, exactly: 2 }], length: 8
        })
        const hashedPassword = await Hash(newPassword);
        
        await User.updateOne({ _id: user[0]._id}, {
            password: hashedPassword,
        });
        
        const sending = await SendTemplate(user[0].mail, "Control Stock Super Mami - Recuperar contraseña", "sendEmail", { principalInfo: `El legajo ${user[0].id} ha solicitado recuperar la contraseña`, secondaryInfo: "Su nueva contraseña es", code: newPassword });
        if (sending.error) return new ErrorModel(535, sending.error, "Error en el envío de email").send(res);

        return res.status(200).send({message: "La nueva contraseña se envió a su mail"});

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = RecoverPassword;
