const port =  3001;
const app = require('./app');

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

console.log({
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    jwt_secret: process.env.JWT_SECRET,
    dialect: 'mysql',
})