const express = require('express');
const router = express.Router();
const { autenticar } = require('../middlewares/autenticacao');
const { eFuncionario } = require('../middlewares/autorizacao');
const usuarioController = require('../controllers/usuarioController');

// Todas as rotas abaixo requerem Autenticação e que o usuário seja Funcionario

// 1. Criar novo Cliente (o controller força o tipo 'Cliente')
router.post('/', autenticar, eFuncionario, usuarioController.criarUsuario);

// 2. Listar todos os usuários
router.get('/', autenticar, eFuncionario, usuarioController.listarTodosUsuarios);

// 3. Buscar detalhes de um usuário específico
router.get('/:id', autenticar, eFuncionario, usuarioController.buscarUsuarioPorId);

// 4. ATUALIZAR um cliente específico (Adicione estas linhas!)
router.put('/:id', autenticar, eFuncionario, usuarioController.atualizarUsuario); 

// 5. DELETAR um cliente específico (Adicione estas linhas!)
router.delete('/:id', autenticar, eFuncionario, usuarioController.deletarUsuario); 

// Rota opcional /api/perfis-clientes/:id (para detalhamento de perfil)
router.get('/perfis-clientes/:id', autenticar, eFuncionario, usuarioController.buscarUsuarioPorId);


module.exports = router;