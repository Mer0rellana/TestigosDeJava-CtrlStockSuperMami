const express = require('express');
const {ensureUserAuthenticated} = require('../../utils/token');
const putInventaryState = require('./controller/putInvetaryState');
const router = express.Router();

router.put("/updateState/:_id",ensureUserAuthenticated,putInventaryState);

module.exports = router;