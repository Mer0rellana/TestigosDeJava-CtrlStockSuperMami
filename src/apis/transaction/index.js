const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const CreateTransaction = require('./controllers/postNewTransaction');

const router = express.Router();

router.post("/add", ensureUserAuthenticated, CreateTransaction);
router.put("/transactionState", ensureUserAuthenticated)

module.exports = router;