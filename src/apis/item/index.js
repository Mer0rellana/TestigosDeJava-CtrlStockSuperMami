const express = require("express");
const {ensureUserAuthenticated}  = require('../../utils/token');
const ItemUpdateState = require("./controllers/putItemState");
const ItemUpdate = require("./controllers/putItem");

const router = express.Router();


router.put("/update/:id",ensureUserAuthenticated, ItemUpdate);
router.put("/update-state/:id",ensureUserAuthenticated, ItemUpdateState);


module.exports = router;
