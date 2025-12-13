const express = require("express");
const router = express.Router();
const carroController = require("../controllers/carroController");
const verificaJWT = require("../middleware/verificaJWT");

// Rotas públicas
router.post("/carros", carroController.criar);

// Rotas privadas
router.get("/carros", verificaJWT, carroController.listarTodos);
router.get("/carros/:id", verificaJWT, carroController.listarPorId);
router.put("/carros/:id", verificaJWT, carroController.atualizar);
router.delete("/carros/:id", verificaJWT, carroController.deletar);

module.exports = router;
