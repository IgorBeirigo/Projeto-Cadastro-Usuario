const { DataTypes } = require('sequelize');
const db = require('../database/db');
const bcrypt = require('bcryptjs');

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 8);
});

module.exports = User;
