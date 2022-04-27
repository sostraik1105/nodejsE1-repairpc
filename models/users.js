const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['client', 'employee']],
                msg: 'role undefined',
            },
        },
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'enabled',
        validate: {
            isIn: [['enabled', 'disabled']],
        },
    },
});

module.exports = { User };
