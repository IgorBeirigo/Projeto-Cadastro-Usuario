const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Buscar todos
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: error.message });
    }
});

// Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(cliente);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: error.message });
    }
});

// Criar
router.post('/', async (req, res) => {
    try {
        const { nome, email, telefone, endereco } = req.body;

        if (!nome || !email || !telefone || !endereco) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const cliente = await Cliente.create({ nome, email, telefone, endereco });
        res.status(201).json(cliente);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: error.message });
    }
});

// Atualizar
router.put('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

        await cliente.update(req.body);
        res.json(cliente);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: error.message });
    }
});

// Deletar
router.delete('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

        await cliente.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

