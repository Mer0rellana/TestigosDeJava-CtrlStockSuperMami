const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const path = require('path');

mongoose.connect('mongodb://localhost/tdj_db')
    .then(db => console.log('db conectada'))
    .catch(err => console.log(err));

//importing routes
const articulosRouter=require('./articulo/index')
//require('./controllers/movimientos/index');

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))


//routes
app.use('/articulos', articulosRouter);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});