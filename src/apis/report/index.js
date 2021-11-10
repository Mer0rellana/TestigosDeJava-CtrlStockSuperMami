const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const GetMostEE = require('./controllers/mostE-E');


const router = express.Router();

router.get('/entries',ensureUserAuthenticated, GetMostEE);

module.exports = router;