const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const PostStock = require('./controllers/postStock');
const getStock = require('./controllers/getStock')


const router = express.Router();


router.get('/', ensureUserAuthenticated, getStock);
router.post('/add', ensureUserAuthenticated, PostStock);


module.exports = router;