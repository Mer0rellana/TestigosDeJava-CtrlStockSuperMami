const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const getStock = require('./controllers/getStock')
const PostStock = require('./controllers/postStock');


const router = express.Router();


router.post('/add', ensureUserAuthenticated, PostStock);
router.get('/',ensureUserAuthenticated,getStock);

module.exports = router;