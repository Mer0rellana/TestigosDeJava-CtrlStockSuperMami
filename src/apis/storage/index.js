const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getStorage = require('./controllers/getStorage');
const postStorage = require('./controllers/postStorage');
const putStorage = require('./controllers/putStorage')

const router = express.Router();

router.get('/',getStorage);
router.put("/delete/:id",ensureUserAuthenticated, putStorage);
router.post("/add", ensureUserAuthenticated, postStorage)

module.exports = router;