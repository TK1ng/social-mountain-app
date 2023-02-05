import { DataTypes } from 'sequelize';
import sequelize from '../util/database';

module.exports = {
    User: sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: DataTypes.BOOLEAN,
            allowNull: DataTypes.BOOLEAN,
            primaryKey: DataTypes.BOOLEAN
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING
    })
};