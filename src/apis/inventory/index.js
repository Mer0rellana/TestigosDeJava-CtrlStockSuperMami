const express = require("express");
const { ensureUserAuthenticated } = require('../../utils/token');
const postInventory = require("./controllers/postInventory");
const GetInventory = require("./controllers/getInventory");
const GetInventories = require("./controllers/getInventories");
const putInventaryState = require("./controllers/putInvetaryState");
const router = express.Router();

router.put("/updateState/:_id", ensureUserAuthenticated, putInventaryState);
router.post('/add', ensureUserAuthenticated, postInventory);
router.get('/detail', ensureUserAuthenticated, GetInventory);
router.get('/', ensureUserAuthenticated, GetInventories);


module.exports = router;