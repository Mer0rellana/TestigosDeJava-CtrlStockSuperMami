const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usuarioRutas = require('./apis/usuario/index');
const articulosRutas = require('./apis/articulo/index'); 
const { DB_LOCAL } = require('./config/config');

const app = express();

//connecting to db
mongoose.connect(DB_LOCAL) 
	.then(db => console.log('Db connected'))
	.catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/usuario', usuarioRutas);
app.use('/articulo', articulosRutas);

//starting the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});