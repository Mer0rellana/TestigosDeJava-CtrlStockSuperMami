const express = require("express");
const {ensureUserAuthenticated}  = require('../../utils/token');
const ItemUpdateState = require("./controllers/putItemState");
const ItemUpdate = require("./controllers/putItem");
const getItems = require('./controllers/getItem');
const postItem = require('./controllers/postItem');
const router = express.Router();


router.put("/update/:id",ensureUserAuthenticated, ItemUpdate);
router.put("/update-state/:id",ensureUserAuthenticated, ItemUpdateState);
router.get('/',ensureUserAuthenticated ,getItems);
router.post('/add',ensureUserAuthenticated,postItem)

module.exports=router;


