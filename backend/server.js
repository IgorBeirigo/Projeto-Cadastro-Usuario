const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database/db');
const Cliente = require('./models/Cliente');
const Produto = require('./models/Produto');
const Entrega = require('./models/Entrega');

app.use(cors());
app.use(express.json());

// Relacionamentos
Cliente.hasMany(Entrega);
Entrega.belongsTo(Cliente);
Entrega.belongsTo(Produto);

// Rotas de Clientes
app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.findAll();
    res.json(clientes);
});

app.post('/clientes', async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;
    const cliente = await Cliente.create({ nome, email, telefone, endereco });
    res.json(cliente);
});

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;
    await Cliente.update({ nome, email, telefone, endereco }, { where: { id } });
    const cliente = await Cliente.findByPk(id);
    res.json(cliente);
});

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    await Cliente.destroy({ where: { id } });
    res.json({ message: 'Cliente removido com sucesso' });
});

// Rotas de Produtos
app.get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
});

app.post('/produtos', async (req, res) => {
    const { nome, tipo, validade, descricao } = req.body;
    const produto = await Produto.create({ nome, tipo, validade, descricao });
    res.json(produto);
});

// Rotas de Entregas
app.get('/entregas', async (req, res) => {
    const entregas = await Entrega.findAll({
        include: [Cliente, Produto]
    });
    res.json(entregas);
});

app.post('/entregas', async (req, res) => {
    const { clienteId, produtoId, protocolo, status } = req.body;
    const entrega = await Entrega.create({
        protocolo,
        status,
        ClienteId: clienteId,
        ProdutoId: produtoId
    });
    res.json(entrega);
});

// Sincronizar banco e iniciar servidor
db.sync().then(() => {
    app.listen(3001, () => {
        console.log('Servidor rodando em http://localhost:3001');
    });
});
