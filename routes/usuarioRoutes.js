const express = require('express');
const router = express.Router();
const { autenticar } = require('../middleware/autenticacao');
const { eFuncionario } = require('../middleware/autorizacao');
const usuarioController = require('../controllers/usuarioController');

// Rotas de Gestão de Usuários 

// Listar todos os usuários/clientes
router.get('/', autenticar, eFuncionario, usuarioController.listarTodosUsuarios);

// Buscar detalhes de um usuário específico pelo id
router.get('/:id', autenticar, eFuncionario, usuarioController.buscarUsuarioPorId);

// Atualizar um cliente específico pelo id
router.put('/:id', autenticar, eFuncionario, usuarioController.atualizarUsuario); 

// Deletar um cliente específico pelo id
router.delete('/:id', autenticar, eFuncionario, usuarioController.deletarUsuario); 

module.exports = router;