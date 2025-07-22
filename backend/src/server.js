const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Tentativa de login:', { email, password }); // Log para debug

    if (email === 'admin@test.com' && password === '123456') {
        const token = jwt.sign({ id: 1, email }, JWT_SECRET);
        console.log('Login bem sucedido, token gerado'); // Log para debug
        res.json({ token });
    } else {
        console.log('Login falhou - credenciais inválidas'); // Log para debug
        res.status(401).json({ message: 'Email ou senha inválidos' });
    }
});

module.exports = app;