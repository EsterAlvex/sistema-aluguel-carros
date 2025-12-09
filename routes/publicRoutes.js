const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const autenticacaoController = require('../controllers/autenticacaoController'); 

// Rotas Totalmente Públicas  
// Cadastro Público
router.post('/cadastro', usuarioController.cadastroPublico);

// Login (Autenticação)
router.post('/login', autenticacaoController.login);

module.exports = router;