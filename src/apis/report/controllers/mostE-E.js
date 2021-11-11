const Item = require("../../../models/item");
const ErrorModel = require('../../../models/api-error');
var _ = require('lodash');

const GetMostEE = async (req, res) => {
    try {
        
        const { order } = req.params;

        const item = await Item.find({});

        let items = [];

        for (const i of item) {
            items.push(i);
        }

        const report = _.orderBy(items.slice(0,5), ["entry", "exit"], order);

        return res.status(200).json(report);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = GetMostEE;