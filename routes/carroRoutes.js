const express = require("express");
const router = express.Router();
const carroController = require("../controllers/carroController");

//Rota de cadastro do carro
app.post('/carros', async (req, res) => {
    try {
        const novoCarro = await Carro.create(req.body);
        res.status(201).json(novoCarro);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao cadastrar carro.", error: error.message });
    }
});

// Rotas privadas 
// Rota para listar carros
app.get('/carros', verificaJWT, async (req, res) => {
    try {
        const carros = await Carro.findAll();
        res.status(200).json(carros);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar carros."});
    }
});

// Rota para listar por ID
app.get('/carros/:id', verificaJWT, async (req, res) => {
    try {
        const carro = await Carro.findByPk(req.params.id);
        if (!carro) {
            return res.status(404).json({ mensagem: "Carro não encontrado."});
        }
        res.status(200).json(carro);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar carro."});
    }
});

// Rota para atualizar um carro
app.put('/carros/:id', verificaJWT, async (req, res) => {
    try {
        const carro = await Carro.findByPk(req.params.id);
        if (!carro) {
            return res.status(404).json({ mensagem: "Carro não encontrado."});
        }
        await carro.update(req.body);
        res.status(200).json(carro);
    } catch (error) {
        res.status(400).json({mensagem: "Erro ao atualizar carro.", erro: error.message});
    }
});

// Rota para deletar um carro
app.delete('/carros/:id', verificaJWT, async (req, res) => {
    try {
        const carro = await Carro.findByPk(req.params.id);
        if (!carro) {
            return res.status(404).json({ mensagem: "Carro não encontrado."});
        }
        await carro.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao deletar carro."});
    }
});

// SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});