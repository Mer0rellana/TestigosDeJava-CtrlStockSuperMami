const { AdjustmentSchema } = require('../../../models/adjustment');
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');

const getAdjustment = async (req, res) => {

    try {

        const token = res.locals.payload;

        if (token.role === "Admin" || token.role === 'Encargado stock') {

            const { _id } = req.query;

            let adj = [];

            if (!_id) {

                adj = await AdjustmentSchema.find();

            } else if (_id) {

                adj = await AdjustmentSchema.find({ _id });

            }

            const response = adj.map(i => {
                i = {
                    _id: i._id,
                    createdAt: moment(i.createdAt).format('DD/MM/YYYY'),
                    idUser: i.idUser,
                    idInventory: i.idInventory,
                    idStock: i.idStock,
                    description: i.description,
                    systemStock: i.systemStock,
                    realStock: i.realStock,
                    failedRealStock: i.failedRealStock,
                    failedSystemStock: i.failedSystemStock,
                    state: i.state
                }
                return i;
            })
            return res.status(200).send(response);
        } else {
            return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
        }

    } catch (err) {

        return new ErrorModel().newInternalServerError(err.message).send(res);

    }
}

module.exports = getAdjustment;