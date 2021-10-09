const express = require('express');
const  Ejemplo  = require('./controllers/ejemplo');
const LoginUser = require('./controllers/postLogin');
const router = express.Router();

router.get('/ejemplo', Ejemplo);
router.post('/login', LoginUser);


module.exports = router;