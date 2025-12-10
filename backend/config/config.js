require('dotenv').config();

module.exports = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '13162026',
    database: process.env.DB_NAME || 'sistema_entregas',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
};
