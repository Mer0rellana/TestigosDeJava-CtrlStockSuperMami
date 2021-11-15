const { InventorySchema } = require('../../../models/inventory');
const ErrorModel = require('../../../models/api-error');
const moment = require('moment');
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
    id: yup.string()
});

const GetInventories = async (req, res) => {
    try {
        const request = await Validator(req.query, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        let inventories = [];
        console.log(request.data.id)
        console.log(req.query)
        if (request.data.id) {
            inventories = await InventorySchema.find({ idItem: request.data.id });
            console.log(inventories)
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
        
        return res.status(200).send(response);


    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = GetInventories;