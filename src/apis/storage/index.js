const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getStorage = require('./controllers/getStorage');
const putStorage = require('./controllers/putStorage')

const router = express.Router();

router.get('/',getStorage);
router.put("/delete/:id",ensureUserAuthenticated, putStorage);

module.exports = router;