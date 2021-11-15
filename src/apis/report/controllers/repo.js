const { StockSchema } = require("../../../models/stock");
const ErrorModel = require('../../../models/api-error');

const GetRepo = async (req, res) => {
    try {

        const repo = [];
        const items = await StockSchema.find({});

        for (const i of items) {
            if (i.adjusted === true && i.minStock > i.currentStock) {
                repo.push(i);
            } 
        }
        return res.status(200).json(repo);
    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = GetRepo;