const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const GetMostEE = require('./controllers/mostE-E');
const GetRepo = require('./controllers/repo');


const router = express.Router();

router.get('/entries/:order',ensureUserAuthenticated, GetMostEE);
router.get('/restock', ensureUserAuthenticated, GetRepo);

module.exports = router;