const StorageSchema = require("../../../models/storage");
const ErrorModel = require("../../../models/api-error");
const Moment = require("moment");

const StorageUpdateState = async (req,res) => {
    try{
        const token = res.locals.payload;
        if (token.role === "Admin"||token.role === "Encargado stock"||token.role === "Gerencia"){
            const fecha = Moment.now();
            const { id } = req.params;
            await StorageSchema.updateOne({id : id}, {$set: {state:"Inactivo", updatedAt: fecha}});
            return res.status(200).send({message: "El almacenamiento fue dado de bajo de forma exitosa"});
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