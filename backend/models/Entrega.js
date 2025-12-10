const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Entrega = sequelize.define('Entrega', {
    protocolo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente'
    }
}, {
    tableName: 'entregas',
    timestamps: true
});

Entrega.associate = (models) => {
    Entrega.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'Cliente'
    });
    Entrega.belongsTo(models.Produto, {
        foreignKey: 'produtoId',
        as: 'Produto'
    });
};

module.exports = Entrega;
