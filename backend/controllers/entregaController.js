const { Entrega, Cliente, Produto } = require('../models');

async function listarEntregas(req, res) {
    try {
     
const entregas = await Entrega.findAll({
    include: [
        { model: Cliente, as: 'Cliente', attributes: ['id', 'nome', 'email'] },
        { model: Produto, as: 'Produto', attributes: ['id', 'nome', 'tipo'] }
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
});

        res.json(entregas);
    } catch (err) {
        console.error('Erro ao listar entregas:', err);
        res.status(500).json({ erro: 'Erro ao buscar entregas', detalhes: err.message });
    }
}

async function salvarEntrega(req, res) {
    try {
        const { protocolo, status, clienteId, produtoId } = req.body;

        if (!protocolo || !status || !clienteId || !produtoId) {
            return res.status(400).json({ erro: 'Campos obrigatórios: protocolo, status, clienteId, produtoId' });
        }

        const entrega = await Entrega.create({ protocolo, status, clienteId, produtoId });
        res.status(201).json(entrega);
    } catch (err) {
        console.error('Erro ao salvar entrega:', err);
        res.status(500).json({ erro: 'Erro ao salvar entrega', detalhes: err.message });
    }
}

async function atualizarEntrega(req, res) {
    try {
        const entrega = await Entrega.findByPk(req.params.id);
        if (!entrega) {
            return res.status(404).json({ erro: 'Entrega não encontrada' });
        }

        await entrega.update(req.body);
        
const entregaAtualizada = await Entrega.findByPk(req.params.id, {
    include: [
        { model: Cliente, as: 'Cliente', attributes: ['id', 'nome', 'email'] },
        { model: Produto, as: 'Produto', attributes: ['id', 'nome', 'tipo'] }
    ]
        });

        res.json(entregaAtualizada);
    } catch (err) {
        console.error('Erro ao atualizar entrega:', err);
        res.status(500).json({ erro: 'Erro ao atualizar entrega', detalhes: err.message });
    }
}

async function excluirEntrega(req, res) {
    try {
        const entrega = await Entrega.findByPk(req.params.id);
        if (!entrega) {
            return res.status(404).json({ erro: 'Entrega não encontrada' });
        }

        await entrega.destroy();
        res.status(204).send();
    } catch (err) {
        console.error('Erro ao excluir entrega:', err);
        res.status(500).json({ erro: 'Erro ao excluir entrega', detalhes: err.message });
    }
}

module.exports = {
    listarEntregas,
    salvarEntrega,
    excluirEntrega,
    atualizarEntrega
};