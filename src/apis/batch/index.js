const express = require('express');
const {ensureUserAuthenticated} = require('../../utils/token');
const putBatch = require('./controllers/putBatch');
const router = express.Router();

router.put("/update/:id",ensureUserAuthenticated,putBatch)

module.exports=router;