const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');

const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const entregaRoutes = require('./routes/entregaRoutes');

const db = require('./models');
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

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor está operacional' });
});

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error('Erro:', err.stack);
    res.status(err.status || 500).json({ 
        error: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Inicialização do servidor
const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Conexão com banco de dados estabelecida');
        
        await db.sequelize.sync({ alter: false });
        console.log('✅ Modelos sincronizados');

        const PORT = config.port || 3001;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
            console.log(`📝 API disponível em http://localhost:${PORT}/api`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error.message);
        process.exit(1);
    }
};

startServer();

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    console.error('🔥 Erro não tratado:', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('🔥 Exceção não capturada:', err);
    process.exit(1);
});

