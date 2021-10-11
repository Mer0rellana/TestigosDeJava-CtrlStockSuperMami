const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');


const MyProfile = async (req, res) => {
    try {
        const token = res.locals.payload;
        const user = await User.find({ id: token.id });

        const response = {
            id: user[0].id,
            name: user[0].name,
            dni: user[0].dni,
            mail: user[0].mail,
            tel: user[0].tel,
            role: user[0].role,
            state: user[0].state
        }
        return res.status(200).send(response);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = MyProfile;