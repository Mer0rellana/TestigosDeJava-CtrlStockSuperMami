const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getAdjustment = require('./controllers/getAdjustment');
const postAdjustment = require('./controllers/postAdjustment');

const router = express.Router();

router.post('/add/:_id',ensureUserAuthenticated, postAdjustment);
router.get('/', ensureUserAuthenticated, getAdjustment);

module.exports = router;