const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Entrega = sequelize.define('Entrega', {
    protocolo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Entrega;
