const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const  Ejemplo  = require('./controllers/ejemplo');
const LoginUser = require('./controllers/postLogin');
const CreateUser = require('./controllers/postNewUser');
const RecoverPassword = require ('./controllers/postRecoverPassword')
const router = express.Router();

router.get('/ejemplo', ensureUserAuthenticated ,Ejemplo); //ejemplo para sacar datos del token
router.post('/login', LoginUser);
router.post('/add', ensureUserAuthenticated ,CreateUser);
router.post('/recoverPassword', RecoverPassword);


module.exports = router;