const { AdjustmentSchema } = require('../../../models/adjustment');
const ErrorModel = require('../../../models/api-error');

const getAdjustment = async (req, res) => {

    try {

        const token = res.locals.payload;

        if (token.role === "Admin" || token.role === 'Encargado stock') {

            const { _id } = req.query;

            if (!_id) {

                const adjustments = await AdjustmentSchema.find();

                return res.status(200).send(adjustments);

            } else if (_id) {

                const adjustment = await AdjustmentSchema.find({ _id });

                return res.status(200).send(adjustment);
            }


        } else {
            return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
        }

    } catch (err) {

        return new ErrorModel().newInternalServerError(err.message).send(res);

    }
}

module.exports = getAdjustment;