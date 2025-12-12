require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT = process.env.JWT_SECRET;

app.use(express.json());

const PORT = process.env.PORT || 3000;

const { Usuario } = require('./models');
const { Carro } = require('./models');
const { Locacao } = require('./models');

//Rota Principal
app.get('/', (req, res) => {
    res.send("Bem vindo a API do sistema Drive Easy").status(200);
});

//Usuarios e perfis

// Rota para login de usuário (Funcionário)



// Servidor
app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
})
