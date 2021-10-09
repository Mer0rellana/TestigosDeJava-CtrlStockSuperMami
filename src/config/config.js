require('dotenv').config();

const nodeEnv = (process.env.NODE_ENV = process.env.NODE_ENV || 'dev').trim();

const ENV=nodeEnv 
    ,PORT=process.env.PORT
    ,EMAIL = process.env.EMAIL
    , EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
    , DB_LOCAL = process.env.DB_LOCAL

module.exports = {
    ENV,
    PORT,
    EMAIL,
    EMAIL_PASSWORD,
    DB_LOCAL
}