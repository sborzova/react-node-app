const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName:process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPoolMax: process.env.DB_POOL_MAX,
    dbPoolMin: process.env.DB_POOL_MIN,
    dbAcquire: process.env.DB_ACQUIRE,
    dbIdle: process.env.DB_IDLE
};