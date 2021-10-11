const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const GetUsers = require('./controllers/getUsers');
const MyProfile = require('./controllers/getMyProfile');
const LoginUser = require('./controllers/postLogin');
const CreateUser = require('./controllers/postNewUser');
const RecoverPassword = require('./controllers/postRecoverPassword');
const PutPassword = require('./controllers/putPassword');
const router = express.Router();

router.post('/login', LoginUser);
router.post('/add', ensureUserAuthenticated ,CreateUser);
router.post('/recoverPassword', RecoverPassword);
router.get('/myProfile', ensureUserAuthenticated, MyProfile);
router.get('/', ensureUserAuthenticated, GetUsers);
router.put('/updatePassword', ensureUserAuthenticated, PutPassword);

module.exports = router;