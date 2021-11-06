const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const PostStock = require('./controllers/postStock');
const getStock = require('./controllers/getStock')


const router = express.Router();


router.post('/add', ensureUserAuthenticated, PostStock);
router.get('/',ensureUserAuthenticated,getStock);

module.exports = router;