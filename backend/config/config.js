require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    database: {
        host: process.env.DB_HOST || 'localhost',
        name: process.env.DB_NAME || 'sistema_entregas',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '13162026'
    }
};
