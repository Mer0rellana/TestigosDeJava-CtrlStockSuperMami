const express = require("express");
const {ensureUserAuthenticated}  = require('../../utils/token');
const postInventory = require("./controllers/postInventory");

const router = express.Router();

router.post('/add', ensureUserAuthenticated, postInventory);


module.exports=router;