const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const entregaRoutes = require('./routes/entregaRoutes');
const expressListEndpoints = require('express-list-endpoints');

const app = express();

// Middleware de segurança e logging
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Roteamento
app.use('/api/clientes', clienteRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/entregas', entregaRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Inicialização do servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('📦 Conexão com banco estabelecida');
        
        await sequelize.sync();
        console.log('🔄 Modelos sincronizados');

        app.listen(config.port, () => {
            console.log(`🚀 Servidor rodando na porta ${config.port}`);
            if (process.env.NODE_ENV === 'development') {
                const routes = require('express-list-endpoints')(app);
                console.log('📍 Rotas disponíveis:', routes);
            }
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

startServer();

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    console.error('🔥 Erro não tratado:', err);
    process.exit(1);
});
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Banco conectado com sucesso!'))
  .catch(err => console.log('Erro ao conectar com o banco:', err));
