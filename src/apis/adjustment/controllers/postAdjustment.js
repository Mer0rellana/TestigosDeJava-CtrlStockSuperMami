const { AdjustmentSchema } = require("../../../models/adjustment");
const { InventorySchema } = require("../../../models/inventory");
const { StockSchema } = require("../../../models/stock");
const ErrorModel = require("../../../models/api-error");
const moment = require("moment");
const yup = require("yup");
const Validator = require('../../../utils/validator');

const schema = yup.object().shape({
    idInventory: yup.string().required(),
    idStock: yup.string().required()
});

const postAdjustment = async (req, res) => {
    try {
        const token = res.locals.payload

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        if (token.role === 'Encargado stock' || token.role === 'Admin') {

            const stock = await StockSchema.findById(request.data.idStock);

            if (!stock) return new ErrorModel().newNotFound(`El código ${request.data.idStock} no pertenece a ningún stock del sistema`).send(res);

            const inventory = await InventorySchema.findById(request.data.idInventory);

            console.log(inventory)

            if (!inventory) return new ErrorModel().newNotFound(`El código ${request.data.idInventory} no pertenece a ningún inventario del sistema`).send(res);


            await StockSchema.findByIdAndUpdate(request.data.idStock, 
                {
                    $set: {
                        adjusted: true,
                        updatedAt: moment.now()
                    }
                }
            );

            await InventorySchema.findByIdAndUpdate(request.data.idInventory, 
                {
                    $set: {
                        adjusted: true,
                        updatedAt: moment.now()
                    }
                }
            );

            const adjustment = new AdjustmentSchema({
                ...req.body,
                idUser: token.id,
                description: stock.description,
                systemStock: stock.currentStock,
                realStock: inventory.realStock,
                failedSystemStock: stock.failedStock,
                failedRealStock: inventory.failedRealStock,
                createdAt: moment.now(),
            });

            const err = adjustment.validateSync();
            if (err) return new ErrorModel().newBadRequest(err.message).send(res);

            await adjustment.save();

            return res.status(200).send({ message: "Ajuste cargado con éxito" });

        } else {
            return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
        }
    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = postAdjustment;