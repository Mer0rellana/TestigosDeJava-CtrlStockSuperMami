
const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const { Hash, Verify } = require('../../../utils/hashing');
const { PasswordReg } = require('../../../utils/reg-exp');
const moment = require('moment');

const schema = yup.object().shape({
    currentPassword: yup.string().matches(PasswordReg).required(),
    newPassword: yup.string().matches(PasswordReg).required(),
    confirmNewPassword: yup.string().matches(PasswordReg).required(),
});

const PutPassword = async (req, res) => {
    try {
        const token = res.locals.payload;

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        if (request.data.newPassword !== request.data.confirmNewPassword) return new ErrorModel(403, "Bad Request", "Las nuevas contraseñas no coinciden entre sí").send(res);
        if (request.data.newPassword === request.data.currentPassword) return new ErrorModel(405, "Bad Request", "La nueva contraseña no puede ser igual a la anterior").send(res);

        const user = await User.find({ id: token.id });

        const verify = await Verify(request.data.currentPassword, user[0].password);
        if (!verify) return new ErrorModel(402, "Bad Request", "La contraseña actual no coincide con la ingresada").send(res);

        const hashedPassword = await Hash(request.data.newPassword);

        await User.updateOne({ _id: user[0]._id }, {
            password: hashedPassword,
            updatedAt: moment.now(),
        });

        return res.status(200).send({ message: "Contraseña actualizada con éxito" });

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = PutPassword;