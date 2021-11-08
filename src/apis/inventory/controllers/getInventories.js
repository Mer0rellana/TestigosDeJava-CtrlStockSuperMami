const { InventorySchema } = require('../../../models/inventory');
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
    id: yup.string().max(24, 'El id del inventario debe tener 24 caracteres').min(24)
});

const GetInventories = async (req, res) => {
    try {
        const request = await Validator(req.query, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        let inventories = [];

        if (request.data.id) {
            inventories = await InventorySchema.find({ _id: request.data.id });
        } else {
            inventories = await InventorySchema.find();
        }

        const response = inventories.map(i => {
            i = {
                _id: i._id,
                createdAt: moment(i.createdAt).format('DD/MM/YYYY'),
                idUser: i.idUser,
                idItem: i.idItem,
                description: i.description,
                adjusted: i.adjusted,
                state: i.state
            }
            return i;
        })
        console.log(response)
        return res.status(200).send(response);


    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = GetInventories;