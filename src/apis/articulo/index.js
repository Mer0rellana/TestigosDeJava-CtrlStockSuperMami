const express = require('express');
const  Ejemplo  = require('./controllers/ejemplo');
const router = express.Router();

router.post('/ejemplo', Ejemplo);

module.exports = router;