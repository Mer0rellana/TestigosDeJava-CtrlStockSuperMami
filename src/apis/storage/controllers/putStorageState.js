const { StorageSchema } = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");
//storageupdate

const StorageUpdateState = async (req,res) => {

    try{
        const token = res.locals.payload;

        if (token.role === "Admin" || token.role === "Operario stock" || token.role === "Encargado stock" ) {

            const { id } = req.params;

            const storage = await StorageSchema.updateOne({
                id : id
            }, { 
                state:"Inactivo", 
                updatedAt: Moment.now()
            });

            if (storage.matchedCount === 0) return new ErrorModel().newNotFound("El depósito no existe").send(res);

            return res.status(200).send({message: "El depósito fue dado de baja de forma exitosa"});
        }
        else{
            return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
        }
    }
    catch(err){
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = StorageUpdateState;