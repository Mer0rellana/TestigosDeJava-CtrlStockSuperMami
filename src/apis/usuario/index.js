const express = require('express');
const  Ejemplo  = require('./controllers/ejemplo');
const router = express.Router();

router.get('/ejemplo', Ejemplo);

module.exports = router;