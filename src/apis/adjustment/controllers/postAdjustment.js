const { AdjustmentSchema } = require("../../../models/adjustment");
const { InventorySchema } = require("../../../models/inventory");
const { StockSchema } = require("../../../models/stock");
const ErrorModel = require("../../../models/api-error");
const moment = require("moment");


const postAdjustment = async (req, res) => {
    try {
        const token = res.locals.payload

        const { _id } = req.params;

        if (token.role === 'Encargado stock' || token.role === 'Admin') {

            const inventory = await InventorySchema.findById(_id);

            if (!inventory) return new ErrorModel().newNotFound(`El código ${_id} no pertenece a ningún inventario del sistema`).send(res);

            const stock = await StockSchema.findOne({ idItem: inventory.idItem });

            if (!stock) return new ErrorModel().newNotFound(`El código ${inventory.idStock} no pertenece a ningún stock del sistema`).send(res);

            await StockSchema.findByIdAndUpdate(stock._id, 
                {
                    $set: {
                        adjusted: true,
                        updatedAt: moment.now()
                    }
                }
            );

            await InventorySchema.findByIdAndUpdate(_id, 
                {
                    $set: {
                        adjusted: true,
                        updatedAt: moment.now()
                    }
                }
            );

            const adjustment = new AdjustmentSchema({
                idStock: stock._id,
                idInventory: _id,
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