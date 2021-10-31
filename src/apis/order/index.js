const express = require("express");
const {ensureUserAuthenticated}  = require('../../utils/token');
const  CreateOrder = require('./controllers/postNewOrder');
const  GetOrders = require('./controllers/getOrders');
const router = express.Router();

router.post('/add',ensureUserAuthenticated, CreateOrder);
router.get('/',ensureUserAuthenticated, GetOrders);

module.exports=router;
