const Sequelize = require('sequelize');
const { dbName, dbUser, dbPassword } = require('./config');

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: process.env.DB_POOL_MAX,
        min: process.env.DB_POOL_MAX,
        acquire: process.env.DB_ACQUIRE,
        idle: process.env.IDLE
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;