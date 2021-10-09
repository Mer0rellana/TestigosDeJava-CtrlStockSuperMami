const User = require('../../../models/user');
const { createUserToken } = require('../../../utils/token');
const ErrorModel = require('../../../models/api-error');
const { Verify } = require('../../../utils/hashing');

const LoginUser = async (req, res) => {
    try {
        const user = await User.find({ mail: req.body.mail });
        if (!user.length) return new ErrorModel().newNotFound("The email doesn't exist").send(res);

        const hashed_password = await Verify(req.body.contrasenia, user[0].contrasenia);
        if (!hashed_password) return new ErrorModel(402, "Password is incorrectly", "The password doesn't match").send(res);

        const token = createUserToken(user[0].legajo, user[0].nombre, user[0].rol, user[0].estado);
        return res.status(200).send({ usuario: user, token: token });

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = LoginUser;