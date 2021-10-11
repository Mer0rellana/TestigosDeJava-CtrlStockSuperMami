const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const router = express.Router();

/* const  Ejemplo  = require('./controllers/ejemplo');
const router = express.Router();
router.post('/ejemplo', Ejemplo);
module.exports = router; */

const getAllItems = require('./controllers/getAllItem');
const postItem = require('./controllers/postItem');

router.get('/',ensureUserAuthenticated ,getAllItems);
router.post('/add',ensureUserAuthenticated,postItem)

module.exports=router;


