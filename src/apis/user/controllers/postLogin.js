const User = require('../../../models/user');
const { createUserToken } = require('../../../utils/token');
const ErrorModel = require('../../../models/api-error');
const { Verify } = require('../../../utils/hashing');
const yup = require("yup");
const  Validator  = require('../../../utils/validator');
const { PasswordReg } = require('../../../utils/reg-exp');

const schema = yup.object().shape({
    id: yup.number().required(),
    password: yup.string().matches(PasswordReg).required()
});

const LoginUser = async (req, res) => {
    try {
        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const user = await User.find({ id: request.data.id });
        if (!user.length) return new ErrorModel().newNotFound("El legajo ingresado no existe").send(res);

        const hashed_password = await Verify(req.body.password, user[0].password);
        if (!hashed_password) return ErrorModel().newBadRequest("La contraseña no coincide").send(res);

        const token = createUserToken(user[0].id, user[0].name, user[0].role, user[0].state);
        return res.status(200).send({ token: token });

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = LoginUser;

/*
{
    "id": 789456,
    "name": "Agustina García Rey",
    "dni": 39326857,
    "mail": "agus.garciarey@gmail.com",
    "tel": 3516319913,
    "password": "Testigos123",
    "role": "Admin"
}
*/