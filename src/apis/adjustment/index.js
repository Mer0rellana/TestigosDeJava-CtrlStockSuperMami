const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const postAdjustment = require('./controllers/postAdjustment');

const router = express.Router();

router.post('/add',ensureUserAuthenticated, postAdjustment);

module.exports = router;