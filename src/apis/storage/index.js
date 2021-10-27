const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getStorage = require('./controllers/getStorage');
const postStorage = require('./controllers/postStorage');
const putStorageState = require('./controllers/putStorageState')

const router = express.Router();

router.get('/',getStorage);
router.put("/delete/:id",ensureUserAuthenticated, putStorageState);
router.post("/add", ensureUserAuthenticated, postStorage)

module.exports = router;