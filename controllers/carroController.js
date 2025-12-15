const models = require("../models");
const Carro = models.Carro;

module.exports = {
    
    // Criação do carro
    async criar(req, res) {
        try {
            const tipoUsuario = req.usuario.tipo;
            if (tipoUsuario !== 'Funcionario') {
                return res.status(403).json({ mensagem: "Apenas funcionários podem cadastrar carros." });
            }
            const novoCarro = await models.Carro(req.body);
            return res.status(201).json(novoCarro);
        } catch (error) {
            return res.status(400).json({ mensagem: "Erro ao cadastrar carro", error: error.message });
        }
    },

    // Listar todos
    async listarTodos(req, res) {
        try {
            const carros = await models.Carro.findAll();
            return res.status(200).json(carros);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao buscar carros." });
        }
    },

    // Listar por ID
    async listarPorId(req, res) {
        try {
            const carro = await models.Carro.findByPk(req.params.id);
            if (!carro) {
                return res.status(404).json({ mensagem: "Carro não encontrado." });
            }
            return res.status(200).json(carro);
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao buscar carro." });
        }
    },

    // Atualizar
    async atualizar(req, res) {
        try {
            const carro = await models.Carro.findByPk(req.params.id);
            if (!carro) {
                return res.status(404).json({ mensagem: "Carro não encontrado." });
            }

            await carro.update(req.body);
            return res.status(200).json(carro);
        } catch (error) {
            return res.status(400).json({ mensagem: "Erro ao atualizar carro.", erro: error.message });
        }
    },

    // Deletar
    async deletar(req, res) {
        try {
            const carro = await models.Carro.findByPk(req.params.id);
            if (!carro) {
                return res.status(404).json({ mensagem: "Carro não encontrado." });
            }

            await carro.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao deletar carro." });
        }
    }

};
