const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');


router.get('/', entregaController.listarEntregas);
router.post('/', entregaController.salvarEntrega);
router.put('/:id', entregaController.atualizarEntrega);
router.delete('/:id', entregaController.excluirEntrega);

module.exports = router;