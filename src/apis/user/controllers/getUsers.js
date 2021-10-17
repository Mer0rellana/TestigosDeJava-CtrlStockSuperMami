const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const moment = require('moment');

const schema = yup.object().shape({
    id: yup.number(),
    role: yup.string().oneOf(["Admin", "Gerencia", "Encargado stock", "Operario stock", "Operario almacén"])
});

const GetUsers = async (req, res) => {
    try {
        console.log(req.query);
        const request = await Validator(req.query, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);
        const token = res.locals.payload;
        let users = [];

        if (token.role === "Admin") {
            if(request.data.id){
                users = await User.find({ id: Number(request.data.id) })
            } else if (request.data.role) {
                users = await User.find({ role: request.data.role })
            } else {
                users = await User.find();
            }
            const response = users.map(u => {
                u = {
                    id: u.id,
                    name: u.name,
                    dni: u.dni,
                    mail: u.mail,
                    tel: u.tel,
                    role: u.role,
                    state: u.state,
                    createdAt: moment(u.createdAt).format('DD/MM/YYYY')
                }
                return u
            })

            return res.status(200).send(response);

        } else {
            return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = GetUsers;