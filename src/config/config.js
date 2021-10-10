const config = require('dotenv');

const nodeEnv = (process.env.ENV = process.env.ENV || 'dev').trim();

const PORT=config.PORT
    ,EMAIL = config.EMAIL
    ,EMAIL_PASSWORD = config.EMAIL_PASSWORD
    ,DB_LOCAL = config.DB_LOCAL

module.exports = {
    ENV,
    PORT,
    EMAIL,
    EMAIL_PASSWORD,
    DB_LOCAL
}