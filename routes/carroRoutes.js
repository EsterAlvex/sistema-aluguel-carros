const express = require("express");
const router = express.Router();
const carroController = require("../controllers/carroController");
const { autenticar } = require('../middleware/autenticacao');

// Rotas públicas
router.post("/carros", carroController.criar);

// Rotas privadas
router.get("/carros", autenticar, carroController.listarTodos);
router.get("/carros/:id", autenticar, carroController.listarPorId);
router.put("/carros/:id", autenticar, carroController.atualizar);
router.delete("/carros/:id", autenticar, carroController.deletar);

module.exports = router;
