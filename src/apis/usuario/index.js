const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const Ejemplo  = require('./controllers/ejemplo');
const GetUsers = require('./controllers/getUsers');
const MyProfile = require('./controllers/getMyProfile');
const LoginUser = require('./controllers/postLogin');
const CreateUser = require('./controllers/postNewUser');
const RecoverPassword = require('./controllers/postRecoverPassword');
const DeleteUser = require('./controllers/deleteUser');
const UpdateRole = require('./controllers/updateRole');
const router = express.Router();

router.get('/ejemplo', ensureUserAuthenticated, Ejemplo); //ejemplo para sacar datos del token
router.post('/login', LoginUser);
router.post('/add', ensureUserAuthenticated ,CreateUser);
router.post('/recoverPassword', RecoverPassword);
router.get('/myProfile', ensureUserAuthenticated, MyProfile);
router.get('/', ensureUserAuthenticated, GetUsers);
router.put('/deleteUser/:id', ensureUserAuthenticated, DeleteUser);
router.put('/changeRole/:id', ensureUserAuthenticated, UpdateRole);

module.exports = router;