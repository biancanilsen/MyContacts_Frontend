const jwt = require('jsonwebtoken');

// expira em um dia? N entendi como funciona
const configJwt = {
    expiresIn: '1d',
};

const SECRET = process.env.JWT_SECRET;

module.exports = (data = {}) => jwt.sign({ data }, SECRET, configJwt);