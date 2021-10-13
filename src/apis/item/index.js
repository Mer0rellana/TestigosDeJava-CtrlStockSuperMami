const express = require("express");
const {ensureUserAuthenticated}  = require('../../utils/token');
const ItemUpdateState = require("./controllers/putItemState");
const ItemUpdate = require("./controllers/putItem");
<<<<<<< HEAD

=======
const getItems = require('./controllers/getItem');
const postItem = require('./controllers/postItem');
>>>>>>> 95a973e108bfb9c17b6f2cb8a64ea50807c3aae4
const router = express.Router();


router.put("/update/:id",ensureUserAuthenticated, ItemUpdate);
router.put("/update-state/:id",ensureUserAuthenticated, ItemUpdateState);
<<<<<<< HEAD


module.exports = router;
=======
router.get('/',ensureUserAuthenticated ,getItems);
router.post('/add',ensureUserAuthenticated,postItem)

module.exports=router;


>>>>>>> 95a973e108bfb9c17b6f2cb8a64ea50807c3aae4
