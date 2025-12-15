const express = require("express");
const router = express.Router();
const carroController = require("../controllers/carroController");
const { autenticar } = require('../middleware/autenticacao');
const {eFuncionario} = require('../middleware/autorizacao');

// Rotas públicas
router.post("/carros", carroController.criar);

// Rotas privadas
router.get("/carros", autenticar, eFuncionario, carroController.listarTodos);
router.get("/carros/:id", autenticar, eFuncionario, carroController.listarPorId);
router.put("/carros/:id", autenticar, eFuncionario, carroController.atualizar);
router.delete("/carros/:id", autenticar, eFuncionario, carroController.deletar);

module.exports = router;
