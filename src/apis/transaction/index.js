const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const CreateTransaction = require('./controllers/postNewTransaction');
const TSstate = require('./controllers/putTransactionState');

const router = express.Router();

router.post("/add", ensureUserAuthenticated, CreateTransaction);
router.put("/put/:_id", ensureUserAuthenticated, TSstate)

module.exports = router;