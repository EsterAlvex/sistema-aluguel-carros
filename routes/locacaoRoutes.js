const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');

// Middlewares de segurança
const { autenticar } = require('../middleware/autenticacao');
const { eFuncionario } = require('../middleware/autorizacao');

// Todas as rotas de locação são protegidas.
// Apenas Funcionários podem criar, alterar ou deletar locações.

// POST /api/locacoes
router.post('/locacoes', autenticar, eFuncionario, locacaoController.criarLocacao);

// GET /api/locacoes
router.get('/locacoes', autenticar, eFuncionario, locacaoController.listarLocacoes);

// GET /api/locacoes/:id
router.get('/locacao/:id', autenticar, eFuncionario, locacaoController.buscarLocacaoPorId);

// PUT /api/locacoes/:id
router.put('/locacoes/:id', autenticar, eFuncionario, locacaoController.atualizarLocacao);

// DELETE /api/locacoes/:id
router.delete('locacao/:id', autenticar, eFuncionario, locacaoController.deletarLocacao);

module.exports = router;