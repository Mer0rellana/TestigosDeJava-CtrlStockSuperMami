const config = require('./env.json')

const EMAIL = config.EMAIL
    , EMAIL_PASSWORD = config.EMAIL_PASSWORD
    , DB_LOCAL = config.DB_LOCAL

module.exports = {
    EMAIL,
    EMAIL_PASSWORD,
    DB_LOCAL
}