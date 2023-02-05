require('dotenv').config();
const Sequelize = require('sequelize');
const { CONNECTION_URI } = process.env;

const sequelize = new Sequelize(CONNECTION_URI, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = {
    sequelize
}