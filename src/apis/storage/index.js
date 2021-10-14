const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const postStorage = require('./controllers/postStorage');

const router = express.Router();

router.post('/add',ensureUserAuthenticated,postStorage)

module.exports = router;