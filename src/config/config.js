const config = require('./env.json')

const EMAIL = config.EMAIL
    , EMAIL_PASSWORD = config.EMAIL_PASSWORD
    , DB_LOCAL = config.DB_LOCAL
    , SECRET_TOKEN_USER_AUTH = config.SECRET_TOKEN_USER_AUTH

module.exports = {
    EMAIL,
    EMAIL_PASSWORD,
    DB_LOCAL,
    SECRET_TOKEN_USER_AUTH
}