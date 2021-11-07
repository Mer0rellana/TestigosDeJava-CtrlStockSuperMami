const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const PostStock = require('./controllers/postStock');
const getStock = require('./controllers/getStock')

<<<<<<< HEAD
const router =  express.Router();

=======

const router = express.Router();


router.post('/add', ensureUserAuthenticated, PostStock);
>>>>>>> 3ee1d80c764238729b93118837fd06d768cf4c59
router.get('/',ensureUserAuthenticated,getStock);
router.post('/add', ensureUserAuthenticated, PostStock);

module.exports = router;