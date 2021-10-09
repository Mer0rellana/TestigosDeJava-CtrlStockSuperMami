
const jwt  = require('jwt-simple');
const moment = require('moment')
const { SECRET_TOKEN_USER_AUTH } = require('../config/config');
const ErrorModel = require('../models/api-error');

const ALGHORITM = "HS256";

const createUserToken = (legajo, nombre, rol, estado) => {
    const payload = {
        legajo,
        nombre,
        rol,
        estado,
        expiracion: moment().add(1, "days").unix(),
    };
    return jwt.encode(payload, SECRET_TOKEN_USER_AUTH, ALGHORITM);
}

const ensureUserAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) return new ErrorModel().newUnauthorized("No token in header").send(res);
    const token = req.headers.authorization.split(" ")[1];
    try {
        const payload = jwt.decode(token, SECRET_TOKEN_USER_AUTH, false, ALGHORITM);
        if (payload.expiracion <= moment().unix()) return new ErrorModel().newUnauthorized("Token expired").send(res);
        res.locals.payload = payload;
        return next();
    } catch (err) {
        return new ErrorModel().newUnauthorized(err).send(res);
    }
}

module.exports = {
    createUserToken,
    ensureUserAuthenticated
}

