const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const PostStock = require('./controllers/postStock');


const router = express.Router();


router.post('/add', ensureUserAuthenticated, PostStock);

module.exports = router;