const { ItemSchema } = require("../../../models/item");
const ErrorModel = require('../../../models/api-error');
//var _ = require('lodash');

const GetMostEE = async (req, res) => {
    try {
        
        const { order } = req.query;
        console.log(order)

        const item = await ItemSchema.find({});

        const items = item.map(i => {
            let total = i.entry + i.exit
            i = {
                code: i.code,
                description: i.description,
                entry: i.entry,
                exit: i.exit,
                total
            }
            return i;
        })

        if(order==="asc") {
            items.sort((a,b)=>a.total-b.total); 
        } else if(order==="desc") {
            items.sort((a,b)=>b.total - a.total); 
        }

        const report = items.slice(0, 5)
        
        return res.status(200).json(report);

    } catch (err) {
        return new ErrorModel().newInternalServerError(err.message).send(res);
    }
}

module.exports = GetMostEE;