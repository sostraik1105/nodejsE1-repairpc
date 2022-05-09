const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Repair = db.define('repair', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    computerNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'completed', 'cancelled']],
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { Repair };
