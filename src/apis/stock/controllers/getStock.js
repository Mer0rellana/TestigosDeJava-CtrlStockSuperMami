const { StockSchema } = require("../../../models/stock");
const ErrorModel = require("../../../models/api-error");

const getStocks = async (req, res) => {
    try{
        const token = res.locals.payload;
        if (token.role === "Admin"||token.role ==="Encargado stock" || token.role ==="Operario stock"||token.role ==="Gerencia"){
            const {idItem} = req.query;
            if(!idItem){
                //getall
                const stocks = await StockSchema.find();
                console.log(stocks);
                return res.status(200).send(stocks);
            }else if(idItem){
                //get por idItem
                const stock = await StockSchema.find({idItem});
                return res.status(200).send(stock);
            };
            };
        
        return new ErrorModel().newUnauthorized("Usuario no autorizado").send(res);
    }
    catch(err){
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
};

module.exports = getStocks;