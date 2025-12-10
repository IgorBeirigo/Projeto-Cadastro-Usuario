const sequelize = require('../database/db');

sequelize.authenticate()
  .then(() => {
    console.log('Banco conectado com sucesso!');
  })
  .catch(err => {
    console.error('Erro na conexão:', err);
  });
