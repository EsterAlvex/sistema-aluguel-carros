const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Lista todos os usuários
router.get('/', usuarioController.getAllUsuarios);
// Lista apenas clientes
router.get('/clientes', usuarioController.getClientes);
// Lista apenas funcionários
router.get('/funcionarios', usuarioController.getFuncionarios);

module.exports = router;

const usuarioRouter = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRouter);

app.get('/usuarios', (req, res) => {
    res.send("Bem vindo a Loja EasyCar").status(200);
    
});

app.get('/usuarios/funcionario', (req, res) => {
});