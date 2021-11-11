const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');

const GetUsers = require('./controllers/getUsers');
const MyProfile = require('./controllers/getMyProfile');
const LoginUser = require('./controllers/postLogin');
const CreateUser = require('./controllers/postNewUser');
const RecoverPassword = require('./controllers/postRecoverPassword');
const DeleteUser = require('./controllers/deleteUser');
const UpdateAdmin = require('./controllers/putUserAdmin');
const PutPassword = require('./controllers/putPassword');
const UpdateProfile = require('./controllers/putUser');


const router = express.Router();

router.post('/login', LoginUser);
router.post('/add', ensureUserAuthenticated ,CreateUser);
router.post('/recoverPassword', RecoverPassword);
router.get('/myProfile', ensureUserAuthenticated, MyProfile);
router.get('/', ensureUserAuthenticated, GetUsers);
router.put('/deleteUser/:id', ensureUserAuthenticated, DeleteUser);
router.put('/put/:id', ensureUserAuthenticated, UpdateAdmin);
router.put('/updateUser', ensureUserAuthenticated ,UpdateProfile);
router.put('/updatePassword', ensureUserAuthenticated, PutPassword);

module.exports = router;