const ErrorModel = require('../../../models/api-error');
const User = require('../../../models/user');
const moment = require('moment');

const DeleteUser = async (req, res) => {
    try {

        const token = res.locals.payload;
        if(token.role === "Admin"){

            const { id } = req.params;
            await User.updateOne({ 
                    id: id
                }, { 
                    state: false,
                    updatedAt: moment.now(), 
                });

            return res.status(200).send({ message: "Usuario dado de baja con éxito"});
        } else{
            return new ErrorModel().newUnauthorized().send(res); 
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = DeleteUser;