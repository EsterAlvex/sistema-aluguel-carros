require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT = process.env.JWT_SECRET;

//Rota Principal
app.get('/', (req, res) => {
    res.send("Bem vindo a API do sistema Drive Easy").status(200);
});

//Usuarios e perfis
app.post('/usuario/funcionario', async (req, res) => {
    try {
        const novoFuncionario = await Usuario.create(req.body);
        res.status(201).json(novoFuncionario);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar funcionário.', erro: error.message });
    }
});




// Servidor
app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
})
