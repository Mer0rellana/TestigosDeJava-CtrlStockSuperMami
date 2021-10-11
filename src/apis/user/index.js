const express = require('express');
const { ensureUserAuthenticated } = require('../../utils/token');
const GetUsers = require('./controllers/getUsers');
const MyProfile = require('./controllers/getMyProfile');
const LoginUser = require('./controllers/postLogin');
const CreateUser = require('./controllers/postNewUser');
const RecoverPassword = require('./controllers/postRecoverPassword');
<<<<<<< HEAD:src/apis/usuario/index.js
const UpdateProfile = require('./controllers/putUser');
=======
const PutPassword = require('./controllers/putPassword');
>>>>>>> 0cae747075c31e221c9520f47944b682614fec2b:src/apis/user/index.js
const router = express.Router();

router.post('/login', LoginUser);
router.post('/add', ensureUserAuthenticated ,CreateUser);
router.post('/recoverPassword', RecoverPassword);
router.get('/myProfile', ensureUserAuthenticated, MyProfile);
router.get('/', ensureUserAuthenticated, GetUsers);
<<<<<<< HEAD:src/apis/usuario/index.js
router.put('/updateUser', ensureUserAuthenticated ,UpdateProfile);
=======
router.put('/updatePassword', ensureUserAuthenticated, PutPassword);
>>>>>>> 0cae747075c31e221c9520f47944b682614fec2b:src/apis/user/index.js

module.exports = router;