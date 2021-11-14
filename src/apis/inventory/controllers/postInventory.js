const { InventorySchema } = require("../../../models/inventory");
const { ItemSchema } = require("../../../models/item");
const yup = require("yup");
const moment = require('moment');
const ErrorModel = require("../../../models/api-error");
const Validator = require('../../../utils/validator');
const { StorageSchema } = require("../../../models/storage");

const schema = yup.object().shape({
    idItem: yup.string().required("Ingrese código del artículo"),
    idStorage: yup.number().required().typeError(" Ingrese ID del depósito"),
    realStock: yup.number().required().typeError(" Ingrese stock real"),
    failedRealStock: yup.number().required().typeError(" Ingrese stock fallado"),
    observation: yup.string().max(500," La observación cómo máximo puede tener 500 caracteres")
})


const postInventory = async (req, res) => {
    try {
        const token = res.locals.payload;

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        const storage = await StorageSchema.updateOne({ id: request.data.idStorage },
            {
                $set: {
                    state: "Bloqueado",
                    updatedAt: moment.now()
                }
            }
        );
        if (storage.matchedCount === 0) return new ErrorModel().newNotFound("El depósito ingresado no existe").send(res);
        const item = await ItemSchema.find({ code: request.data.idItem });

        if (!item.length) return new ErrorModel().newNotFound(`El código ${request.data.idItem} no pertenece a ningún artículo del sistema`).send(res);

        const inventory = new InventorySchema({
            idUser: token.id,
            idStorage: request.data.idStorage,
            idItem: request.data.idItem,
            description: item[0].description,
            realStock: request.data.realStock,
            failedRealStock: request.data.failedRealStock,
            observation: request.data.observation,
            state: 'Activo',
            createdAt: moment.now()
        })

        const err = inventory.validateSync();
        if (err) return new ErrorModel().newBadRequest(err.message).send(res);

        await inventory.save();

        return res.status(200).send({ message: "Inventario cargado con éxito" });

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = postInventory;