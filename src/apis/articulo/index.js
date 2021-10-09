const express = require('express');
const router = express.Router();

/* const  Ejemplo  = require('./controllers/ejemplo');
const router = express.Router();
router.post('/ejemplo', Ejemplo);
module.exports = router; */

const getAllArticulo = require('./controllers/getAllArticulo');
const {getById,getArticuloBy} = require('./controllers/getArticuloBy');
const postArticulo = require('./controllers/postArticulo');

router.get('/', getAllArticulo);
router.get('/getByEstado/:estado', getArticuloBy);
router.get('/:id',getById);
router.post('/add',postArticulo)

module.exports=router;


