const express = require("express");
const {ensureUserAuthenticated}  = require('../../utils/token');
const getBatch = require('./controllers/getBatch');
const router = express.Router();


router.get('/',ensureUserAuthenticated ,getBatch);
module.exports=router;
