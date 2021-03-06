const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getStock = require('./controllers/getStock')
const PostStock = require('./controllers/postStock');

const router =  express.Router();

router.get('/',ensureUserAuthenticated,getStock);
router.post('/add', ensureUserAuthenticated, PostStock);

module.exports = router;