const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoute = require('./apis/usuario/index');
const itemRoute = require('./apis/item/index'); 
const cors = require('cors');
const { ENV, DB_LOCAL, PORT } = require('./config/config');

const app = express();
if(ENV==='dev'){
	console.log(ENV)
}
//connecting to db
mongoose.connect(DB_LOCAL) 
	.then(db => console.log('Db connected'))
	.catch(err => console.log(err));

//settings
app.set('port', PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "*",
    allowedHeaders: "*"
}));

//routes
app.use('/user', userRoute);
app.use('/item', itemRoute);

//starting the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});