const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const putStorage = require('./controllers/putStorage')
const router = express.Router();

router.put("/delete/:id",ensureUserAuthenticated, putStorage);
module.exports = router;