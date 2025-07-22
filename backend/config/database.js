const Sequelize = require('sequelize');

const sequelize = new Sequelize('sistema_entregas', 'root', '13162026', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log // Ativa logs do Sequelize
});

// Testar conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar com banco:', err);
    });

module.exports = sequelize;
