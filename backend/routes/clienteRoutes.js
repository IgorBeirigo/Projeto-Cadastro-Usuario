const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Buscar todos
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
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
        res.status(500).json({ error: error.message });
    }
});

// Criar
router.post('/', async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    } catch (error) {
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
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

