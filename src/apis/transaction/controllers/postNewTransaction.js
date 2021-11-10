const Transaction = require('../../../models/transaction');
const Batch = require('../../../models/batch');
const { StorageSchema: Storage } = require('../../../models/storage');
const ErrorModel = require('../../../models/api-error');
const yup = require("yup");
const Validator = require('../../../utils/validator');
const Item = require("../../../models/item");
const moment = require('moment');
const { DateReg } = require('../../../utils/reg-exp');

const schema = yup.object().shape({
    type: yup.string().required("Debe ingresar el tipo de movimiento").oneOf(['Entrada', 'Salida'], 'Los tipos de movimiento son entrada y salida'),
    batches: yup.array(
        yup.object({
            id: yup.string().required("Debe ingresar el id del lote"),
            codeItem: yup.string().required("Debe ingresar el código del artículo"),
            expiredAt: yup.string().optional().matches(DateReg, 'El formato de fecha debe ser dd/mmm/yyyy'),
            amount: yup.number().required("Debe ingresar la cantidad del artículo"),
            storage: yup.number().required("Debe ingresar el depósito de almacenamiento del lote"),
            area: yup.string().required("Debe ingresar el área de almacenamiento del lote")
        }).required("Debe ingresar lotes")
    ).required("Debe ingresar lotes"),
});

const CreateTransaction = async (req, res) => {
    try {
        const token = res.locals.payload;

        const request = await Validator(req.body, schema);
        if (request.err) return new ErrorModel().newBadRequest(request.data).send(res);

        if (token.role === "Admin" || token.role === "Encargado stock" || token.role === "Operario stock" || token.role === "Gerencia") {

            let arrayBatches = [],
                batches = [],
                storages = [];

            for (const b of request.data.batches) {

                const item = await Item.find({ code: b.codeItem });
                if (!item.length) return new ErrorModel().newNotFound(`El código ${b.codeItem} no pertenece a ningún artículo del sistema. Registre el artículo antes de continuar con la transacción`).send(res);

                const storage = await Storage.find({ id: b.storage });
                if (!storage.length || storage[0].state === "Inactivo") return new ErrorModel().newNotFound(`El depósito número ${b.storage} no existe en el sistema`).send(res);
                if (storage[0].state === "Bloqueado") return new ErrorModel().newBadRequest(`Actualmente no puede almacenar ni extraer lotes del depósito número ${b.storage} ya que se encuentra bloqueado por inventario. Intente más tarde`).send(res);

                const area = storage[0].area.filter(area => area.id === b.area);
                if (!area.length) return new ErrorModel().newNotFound(`El área ${b.area} del depósito ${b.storage} no existe`).send(res);

                const batche = await Batch.find({ id: b.id });

                if (request.data.type === "Entrada") {
                    if (batche.length) return new ErrorModel().newBadRequest(`El lote número ${b.id} ya existe en el sistema`).send(res);
                    if (!area[0].available) return new ErrorModel().newBadRequest(`El área ${b.area} del depósito ${b.storage} está ocupada. Intente otra área`).send(res);

                    const batch = new Batch({
                        id: b.id,
                        codeItem: b.codeItem,
                        descriptionItem: item[0].description,
                        state: 'Ingresado',
                        amount: b.amount,
                        expiredAt: b.expiredAt ? moment(b.expiredAt, "DD-MM-YYYY") : 0,
                        idStorage: b.storage,
                        idArea: b.area
                    })

                    const err = batch.validateSync();
                    if (err) return new ErrorModel().newBadRequest(err.message).send(res);

                    batches.push(batch);
                    area[0].available = "false";
                    storages.push(storage[0]);

                    await Item.findOneAndUpdate({ code: b.codeItem },
                        {
                            entry: item[0].entry +1,
                        });

                } else {
                    if (!batche[0]) return new ErrorModel().newNotFound(`El lote ${b.id} no existe en el sistema`).send(res);
                    if (batche[0].idStorage !== b.storage || batche[0].idArea !== b.area) return new ErrorModel().newBadRequest(`El lote ${b.id} no se encuentra en el depósito y área ingresados`).send(res);
                    if (batche[0].state === "Egresado") return new ErrorModel().newBadRequest(`El lote ${b.id} ya ha egresado en un movimiento de salida`).send(res);
                    if (area[0].available) return new ErrorModel().newBadRequest(`El área ${b.area} del depósito ${b.storage} está vacía`).send(res);

                    await Batch.updateOne({
                        id: b.id
                    }, {
                        state: 'Egresado',
                        updatedAt: moment.now()
                    });

                    area[0].available = "true";
                    storages.push(storage[0]);

                    await Item.findOneAndUpdate({ code: b.codeItem },
                        {
                            exit: item[0].exit +1,
                        });
                }

                arrayBatches.push(b.id);
            }

            for (const b of batches) { await b.save() };
            for (const s of storages) { await s.save() };

            const date = moment(moment().toDate()).format('DD/MM/YYYY')
            const transaction = new Transaction({
                type: request.data.type,
                idUser: token.id,
                batches: arrayBatches,
                createdAt: moment(date, "DD-MM-YYYY"),
            });

            const err = transaction.validateSync();
            if (err) return new ErrorModel().newBadRequest(err.message).send(res);

            await transaction.save();

            return res.status(200).send({ message: "Movimiento cargado con éxito" });
        } else {
            return new ErrorModel().newUnauthorized().send(res);
        }

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = CreateTransaction;
