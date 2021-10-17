const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getStorage = require('./controllers/getStorage');
const postStorage = require('./controllers/postStorage')
const router = express.Router();


router.get('/',getStorage);
router.post('/add', ensureUserAuthenticated ,postStorage);

module.exports = router;