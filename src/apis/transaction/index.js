const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const GetTransaction = require('./controllers/getTransactionById');
const GetTransactions = require('./controllers/getTransactions');
const CreateTransaction = require('./controllers/postNewTransaction');

const router = express.Router();

router.post("/add", ensureUserAuthenticated, CreateTransaction);
router.get("/:id", ensureUserAuthenticated, GetTransaction);
router.get("/", ensureUserAuthenticated, GetTransactions)

module.exports = router;