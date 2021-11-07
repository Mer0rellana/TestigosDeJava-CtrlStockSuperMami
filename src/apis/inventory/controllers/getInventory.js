const { InventorySchema }= require('../../../models/inventory');
const User = require('../../../models/user');
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
    id: yup.string().required().max(24, 'El id del inventario debe tener 24 caracteres').min(24)
});

const GetInventory = async (req, res) => {
    try {
        const request = await Validator(req.query, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const inventory = await InventorySchema.findOne({_id: request.data.id});
        if (!inventory) return new ErrorModel().newNotFound('El inventario no existe').send(res);

        const user = await User.find({ id: inventory.idUser });

        const response = {
            ... inventory._doc,
            idUser: `${inventory.idUser}, ${user[0].name}`,
            createdAt: moment(inventory.createdAt).format('DD/MM/YYYY'),
            updatedAt: inventory.updatedAt ? moment(inventory.updatedAt).format('DD/MM/YYYY') : "",
        }

        return res.status(200).send(response);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = GetInventory;