const { StockSchema } = require("../../../models/stock");
const ErrorModel = require("../../../models/api-error");

const getStocks = async (req, res) => {
  try {
    const { idItem } = req.query;
    if (!idItem) {
      //getall
      const stocks = await StockSchema.find();

      return res.status(200).send(stocks);
    } else {
      //get por idItem
      
      const stock = await StockSchema.find({idItem});
      return res.status(200).send(stock);
    }
  } catch (err) {
    return new ErrorModel().newInternalServerError(err.message).send(res);
  }
};

module.exports = getStocks;
