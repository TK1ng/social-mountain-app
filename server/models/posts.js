import { DataTypes } from 'sequelize';
import sequelize from '../util/database';

module.exports = {
    Post: sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: DataTypes.BOOLEAN,
            allowNull: DataTypes.BOOLEAN,
            primaryKey: DataTypes.BOOLEAN
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN
    })
};