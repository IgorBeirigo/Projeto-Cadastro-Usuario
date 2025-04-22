const Sequelize = require('sequelize');

const sequelize = new Sequelize('sistema_entregas', 'root', '13162026', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
