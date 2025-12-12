const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// CRUD
router.post("/", usuarioController.create);
router.get("/", usuarioController.list);
router.get("/:id", usuarioController.findOne);
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.delete);

// login separado
//router.post("/login", usuarioController.login);

module.exports = router;
