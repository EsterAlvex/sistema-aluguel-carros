const express = require("express");
const router = express.Router();
const carroController = require("../controllers/carroController");
const { autenticar } = require('../middleware/autenticacao');
const {eFuncionario} = require('../middleware/autorizacao');

// Rotas públicas
router.post("/", autenticar, eFuncionario, carroController.criar);

// Rotas privadas
router.get("/", autenticar, eFuncionario, carroController.listarTodos);
router.get("/:id", autenticar, eFuncionario, carroController.listarPorId);
router.put("/:id", autenticar, eFuncionario, carroController.atualizar);
router.delete("/:id", autenticar, eFuncionario, carroController.deletar);

module.exports = router;
