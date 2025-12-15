const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');

// Importar Middlewares
const { autenticar } = require('../middleware/autenticacao');
const { eFuncionario } = require('../middleware/autorizacao');

// Rotas simplificadas (o prefixo '/locacoes' virá do app.js)
router.get('/consultar', autenticar, locacaoController.listarMinhasLocacoes);

// CRIAR (POST /locacoes)
router.post('/', autenticar, eFuncionario, locacaoController.criarLocacao);

// LISTAR (GET /locacoes)
router.get('/', autenticar, eFuncionario, locacaoController.listarLocacoes);

// BUSCAR POR ID (GET /locacoes/:id)
router.get('/:id', autenticar, eFuncionario, locacaoController.buscarLocacaoPorId);

// ATUALIZAR (PUT /locacoes/:id)
router.put('/:id', autenticar, eFuncionario, locacaoController.atualizarLocacao);

// DELETAR (DELETE /locacoes/:id)
router.delete('/:id', autenticar, eFuncionario, locacaoController.deletarLocacao);

module.exports = router;