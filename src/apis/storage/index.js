const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getStorage = require('./controllers/getStorage');

const router = express.Router();

router.get('/',getStorage);

module.exports = router;