require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        jwt_secret: process.env.JWT_SECRET,
        dialect: 'mysql',
    }
};