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

const parseOrigins = (value) => {
    if (!value) return [];
    return value
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean);
};

const configuredOrigins = [
    ...parseOrigins(process.env.FRONTEND_URLS),
    ...parseOrigins(process.env.FRONTEND_URL)
];

const developmentOrigins = [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3002'
];

const allowedOrigins = new Set([
    ...configuredOrigins,
    ...(process.env.NODE_ENV === 'production' ? [] : developmentOrigins)
]);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`Origem nao permitida pelo CORS: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
};

// Middleware de segurança e logging
app.use(helmet());
app.use(morgan('combined'));
app.use(cors(corsOptions));
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

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
            console.log(`📝 API disponível em http://localhost:${PORT}/api`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error.message || error);
        if (error && error.stack) {
            console.error(error.stack);
        }
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

