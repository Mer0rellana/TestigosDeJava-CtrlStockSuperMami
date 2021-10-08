const express = require('express');
const moment = require('moment');
const router = express.Router();

const {altaArticuloSchema,getArticuloSchema} = require('../../models/articulo/articulo');
const getAllArticulo = require('./controllers/getAllArticulo');
const getById = require('./controllers/getByArticulo');
const postArticulo = require('./controllers/postArticulo');

router.get('/', getAllArticulo);

router.get('/:id',getById);

router.post('/add',postArticulo)

module.exports=router;
