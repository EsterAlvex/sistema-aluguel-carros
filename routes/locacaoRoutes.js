const express = require('express');
const router = express.Router();

const { Locacao } = require(".../models/locacao.js")

// CRIAR LOCAÇÃO | POST
router.post('/criarLocacao', async (req, res) => {
    try {
        const novaLocacao = await Locacao.create(req.body);
        res.status(201).json(novaLocacao);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao criar nova locação.', erro: error.message });
    }
});

// LISTAR TODAS | GET
router.get('/locacoes', async (req, res) => {
    try {
        const locacoes = await locacoes.findAll();
        res.status(200).json(locacoes);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar as locações.'});
    }
});

// LISTAR LOCAÇÕES POR ID | GET
router.get('/locacao/:id', async (req, res) => {
    try {
        const locacao = await locacao.findByPk(req.params.id);
        if (!locacao) {
           return res.status(404).json({ mensagem: 'Locação não encontrada.'}); 
        }
        res.status(200).json(locacao);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar por locação.'});
    }
});

// LISTAR POR CLIENTE | GET
// Acho que para isso tem que usar o tipo, mas não sei como... Por enquanto.

// LISTAR POR FUNCIONÁRIO | GET

// ATUALIZAR LOCAÇÃO | PUT
router.put('/locacao/:id', async (req, res) => {
    try {
        const locacao = await locacao.findByPk(req.params.id);
        if (!locacao) {
            return res.status(404).json({ mensagem: 'Locação não encontrada.'});
        }
        await locacao.update(req.body);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao atualizar locação.', erro: error.message});
    }
});

// DELETAR UMA LOCAÇÃO | DELETE
router.delete('/locacao/:id', async (req, res) => {
    try {
        const locacao = await locacao.findByPk(req.params.id);
        if (!locacao) {
            return res.status(404).json({ mensagem: 'Locação não encontrada.'});
        } 
        await locacao.destroy();
        res.status(204).send(); // 204 No content
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir locação.'});
    }
});