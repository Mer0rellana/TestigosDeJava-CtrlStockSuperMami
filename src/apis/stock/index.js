const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const PostStock = require('./controllers/postStock');


const router = express.Router();


router.post('/add', ensureUserAuthenticated, PostStock);
const {ensureUserAuthenticated} = require('../../utils/token');
const getStock = require('./controllers/getStock')
const router =  express.Router();

router.get('/',ensureUserAuthenticated,getStock);

module.exports = router;