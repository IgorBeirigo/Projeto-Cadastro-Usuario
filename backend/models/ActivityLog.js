const { DataTypes } = require('sequelize');
const db = require('../database/db');

const ActivityLog = db.define('ActivityLog', {
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = ActivityLog;
